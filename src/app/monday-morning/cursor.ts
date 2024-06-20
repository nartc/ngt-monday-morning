import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
} from "@angular/core";
import { NgtArgs, injectBeforeRender } from "angular-three";
import { injectSphere } from "angular-three-cannon/body";
import { createInjectionToken } from "ngxtension/create-injection-token";
import { Mesh } from "three";

export const [injectCursorRef, provideCursorRef] = createInjectionToken(() =>
  signal<ElementRef<Mesh> | null>(null),
);

@Component({
  selector: "app-cursor",
  standalone: true,
  template: `
    <ngt-mesh [ref]="sphere.ref">
      <ngt-sphere-geometry *args="[0.5, 32, 32]" />
      <ngt-mesh-basic-material
        [fog]="false"
        [depthTest]="false"
        [transparent]="true"
        [opacity]="0.5"
      />
    </ngt-mesh>
  `,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cursor {
  cursorRef = injectCursorRef();
  sphere = injectSphere<Mesh>(() => ({
    args: [0.5],
    position: [0, 0, 10000],
    type: "Static",
  }));

  constructor() {
    this.cursorRef.set(this.sphere.ref);
    injectBeforeRender(({ pointer, viewport: { width, height } }) => {
      const x = pointer.x * width;
      const y = (pointer.y * height) / 1.9 + -x / 3.5;
      this.sphere.api.position.set(x / 1.4, y, 0);
    });
  }
}

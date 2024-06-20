import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { NgtArgs, NgtThreeEvent, injectNgtRef } from "angular-three";
import { Object3D } from "three";

@Component({
  selector: "app-box",
  standalone: true,
  template: `
    <ngt-mesh
      [ref]="boxRef()"
      [castShadow]="true"
      [receiveShadow]="true"
      [position]="position()"
      [scale]="scale()"
      (pointerdown)="pointerdown.emit($any($event))"
      (pointerup)="pointerup.emit()"
    >
      <ngt-box-geometry *args="args()" />
      <ngt-mesh-standard-material
        [color]="color()"
        [opacity]="opacity()"
        [transparent]="transparent()"
      />

      <ng-content />
    </ngt-mesh>
  `,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Box {
  boxRef = input(injectNgtRef<Object3D>());
  args = input([1, 1, 1]);

  color = input("white");
  opacity = input(1);
  transparent = input(false);

  position = input([0, 0, 0]);
  scale = input([1, 1, 1]);

  pointerdown = output<NgtThreeEvent<PointerEvent>>();
  pointerup = output<void>();
}

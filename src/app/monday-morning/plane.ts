import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from "@angular/core";
import { Triplet } from "@pmndrs/cannon-worker-api";
import { NgtArgs } from "angular-three";
import { injectPlane } from "angular-three-cannon/body";

@Component({
  selector: "app-plane",
  standalone: true,
  template: `
    <ngt-mesh [ref]="plane.ref" [receiveShadow]="true">
      <ngt-plane-geometry *args="[1000, 1000]" />
      <ngt-mesh-standard-material color="#171717" />
    </ngt-mesh>
  `,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Plane {
  plane = injectPlane(() => ({
    type: "Static",
    rotation: [-Math.PI / 2, 0, 0] as Triplet,
    position: [0, -5, 0] as Triplet,
  }));
}

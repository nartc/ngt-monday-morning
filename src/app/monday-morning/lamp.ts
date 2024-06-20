import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from "@angular/core";
import { NgtArgs } from "angular-three";
import { injectBox, injectSphere } from "angular-three-cannon/body";
import { injectPointToPoint } from "angular-three-cannon/constraint";
import { injectDragConstraint } from "./drag-constraint";

@Component({
  selector: "app-lamp",
  standalone: true,
  template: `
    <ngt-mesh
      [ref]="box.ref"
      (pointerdown)="dragConstraint.onPointerDown($any($event))"
      (pointerup)="dragConstraint.onPointerUp()"
    >
      <ngt-cone-geometry *args="[2, 2.5, 32]" />
      <ngt-mesh-standard-material />

      <ngt-point-light [decay]="5" [intensity]="10 * Math.PI" />
      <ngt-spot-light
        [angle]="0.4"
        [decay]="0"
        [penumbra]="1"
        [position]="[0, 20, 0]"
        [intensity]="0.6 * Math.PI"
        [castShadow]="true"
      />
    </ngt-mesh>
  `,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lamp {
  Math = Math;
  sphere = injectSphere(() => ({
    args: [1],
    position: [0, 16, 0],
    type: "Static",
  }));
  box = injectBox(() => ({
    angulardamping: 1.99,
    args: [1, 0, 5],
    linearDamping: 0.9,
    mass: 1,
    position: [0, 16, 0],
  }));

  dragConstraint = injectDragConstraint(this.box.ref);

  constructor() {
    injectPointToPoint(this.sphere.ref, this.box.ref, {
      options: { pivotA: [0, 0, 0], pivotB: [0, 2, 0] },
    });
  }
}

import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from "@angular/core";
import { injectCompound } from "angular-three-cannon/body";
import { Box } from "./box";
import { injectDragConstraint } from "./drag-constraint";

@Component({
  selector: "app-chair",
  standalone: true,
  template: `
    <ngt-group
      [ref]="compound.ref"
      (pointerdown)="dragConstraint.onPointerDown($any($event))"
      (pointerup)="dragConstraint.onPointerUp()"
    >
      <app-box [position]="[0, 0, 0]" [scale]="[3, 3, 0.5]" />
      <app-box [position]="[0, -1.75, 1.25]" [scale]="[3, 0.5, 3]" />
      <app-box [position]="[5 + -6.25, -3.5, 0]" [scale]="[0.5, 3, 0.5]" />
      <app-box [position]="[5 + -3.75, -3.5, 0]" [scale]="[0.5, 3, 0.5]" />
      <app-box [position]="[5 + -6.25, -3.5, 2.5]" [scale]="[0.5, 3, 0.5]" />
      <app-box [position]="[5 + -3.75, -3.5, 2.5]" [scale]="[0.5, 3, 0.5]" />
    </ngt-group>
  `,
  imports: [Box],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chair {
  compound = injectCompound(() => ({
    mass: 1,
    position: [-6, 0, 0],
    shapes: [
      { args: [1.5, 1.5, 0.25], mass: 1, position: [0, 0, 0], type: "Box" },
      {
        args: [1.5, 0.25, 1.5],
        mass: 1,
        position: [0, -1.75, 1.25],
        type: "Box",
      },
      {
        args: [0.25, 1.5, 0.25],
        mass: 10,
        position: [5 + -6.25, -3.5, 0],
        type: "Box",
      },
      {
        args: [0.25, 1.5, 0.25],
        mass: 10,
        position: [5 + -3.75, -3.5, 0],
        type: "Box",
      },
      {
        args: [0.25, 1.5, 0.25],
        mass: 10,
        position: [5 + -6.25, -3.5, 2.5],
        type: "Box",
      },
      {
        args: [0.25, 1.5, 0.25],
        mass: 10,
        position: [5 + -3.75, -3.5, 2.5],
        type: "Box",
      },
    ],
    type: "Dynamic",
  }));
  dragConstraint = injectDragConstraint(this.compound.ref);
}

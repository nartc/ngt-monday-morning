import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Signal,
} from "@angular/core";
import { NgtArgs } from "angular-three";
import { injectBox, injectCylinder } from "angular-three-cannon/body";
import { injectNgtsGLTFLoader } from "angular-three-soba/loaders";
import { Material, Mesh } from "three";
import { GLTF } from "three-stdlib";
import { Box } from "./box";
import { injectDragConstraint } from "./drag-constraint";

interface CupGLTF extends GLTF {
  materials: { default: Material; Liquid: Material };
  nodes: { "buffer-0-mesh-0": Mesh; "buffer-0-mesh-0_1": Mesh };
}

@Component({
  selector: "app-mug",
  standalone: true,
  template: `
    <ngt-group
      [ref]="cylinder.ref"
      (pointerdown)="dragConstraint.onPointerDown($any($event))"
      (pointerup)="dragConstraint.onPointerUp()"
      [dispose]="null"
    >
      <ngt-group [scale]="0.01">
        @if (gltf(); as gltf) {
          <ngt-mesh
            [material]="gltf.materials.default"
            [geometry]="gltf.nodes['buffer-0-mesh-0'].geometry"
            [castShadow]="true"
            [receiveShadow]="true"
          />
          <ngt-mesh
            [material]="gltf.materials.Liquid"
            [geometry]="gltf.nodes['buffer-0-mesh-0_1'].geometry"
            [castShadow]="true"
            [receiveShadow]="true"
          />
        }
      </ngt-group>
    </ngt-group>
  `,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Mug {
  gltf = injectNgtsGLTFLoader(() => "./cup.glb") as Signal<CupGLTF | null>;
  cylinder = injectCylinder(() => ({
    args: [0.6, 0.6, 1, 16],
    mass: 1,
    position: [9, 0, 0],
    rotation: [Math.PI / 2, 0, 0],
  }));
  dragConstraint = injectDragConstraint(this.cylinder.ref);
}

@Component({
  selector: "app-table",
  standalone: true,
  template: `
    <app-box [scale]="[5, 0.5, 5]" [boxRef]="seat.ref" />
    <app-box [scale]="[0.5, 4, 0.5]" [boxRef]="leg1.ref" />
    <app-box [scale]="[0.5, 4, 0.5]" [boxRef]="leg2.ref" />
    <app-box [scale]="[0.5, 4, 0.5]" [boxRef]="leg3.ref" />
    <app-box [scale]="[0.5, 4, 0.5]" [boxRef]="leg4.ref" />
    <app-mug />
  `,
  imports: [NgtArgs, Mug, Box],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table {
  seat = injectBox(() => ({
    args: [2.5, 0.25, 2.5],
    position: [9, -0.8, 0],
    type: "Static",
  }));
  leg1 = injectBox(() => ({
    args: [0.25, 2, 0.25],
    position: [7.2, -3, 1.8],
    type: "Static",
  }));
  leg2 = injectBox(() => ({
    args: [0.25, 2, 0.25],
    position: [10.8, -3, 1.8],
    type: "Static",
  }));
  leg3 = injectBox(() => ({
    args: [0.25, 2, 0.25],
    position: [7.2, -3, -1.8],
    type: "Static",
  }));
  leg4 = injectBox(() => ({
    args: [0.25, 2, 0.25],
    position: [10.8, -3, -1.8],
    type: "Static",
  }));
}

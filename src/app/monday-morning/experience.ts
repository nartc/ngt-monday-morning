import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgtArgs, extend, injectNgtStore } from "angular-three";
import { NgtcPhysics, NgtcPhysicsContent } from "angular-three-cannon";
import { NgtcDebug } from "angular-three-cannon/debug";
import { scan, startWith } from "rxjs";
import * as THREE from "three";
import { Chair } from "./chair";
import { Cursor } from "./cursor";
import { Lamp } from "./lamp";
import { Plane } from "./plane";
import { RagDoll } from "./rag-doll";
import { Table } from "./table";

extend(THREE);

@Component({
  standalone: true,
  template: `
    <ngt-color attach="background" *args="['#171720']" />
    <ngt-fog attach="fog" *args="['#171720', 20, 70]" />
    <ngt-ambient-light [intensity]="0.2 * Math.PI" />
    <ngt-point-light
      color="red"
      [decay]="0"
      [position]="[-10, -10, -10]"
      [intensity]="1.5 * Math.PI"
    />

    <ngtc-physics
      [options]="{ iterations: 15, gravity: [0, -200, 0], allowSleep: false }"
      [debug]="{ enabled: debug(), scale: 1.1, color: 'white' }"
    >
      <ng-template physicsContent>
        <app-cursor />
        <app-plane />
        <app-rag-doll />
        <app-chair />
        <app-table />
        <app-lamp />
      </ng-template>
    </ngtc-physics>
  `,
  imports: [
    NgtArgs,
    NgtcPhysics,
    NgtcPhysicsContent,
    NgtcDebug,
    Cursor,
    Plane,
    RagDoll,
    Chair,
    Table,
    Lamp,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "experience" },
})
export class Experience {
  Math = Math;

  store = injectNgtStore();
  debug = toSignal(
    this.store.get("pointerMissed$").pipe(
      scan((acc) => !acc, false),
      startWith(false),
    ),
  );
}

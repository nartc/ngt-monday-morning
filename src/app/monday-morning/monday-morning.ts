import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgtCanvas } from "angular-three";
import { provideCursorRef } from "./cursor";
import { Experience } from "./experience";

@Component({
  selector: "app-monday-morning",
  standalone: true,
  template: `
    <ngt-canvas
      [sceneGraph]="scene"
      [camera]="{ far: 100, near: 1, position: [-25, 20, 25], zoom: 25 }"
      [orthographic]="true"
      [shadows]="true"
    />
  `,
  imports: [NgtCanvas],
  providers: [provideCursorRef()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      height: 100dvh;
      cursor: none;
    }
  `,
})
export class MondayMorning {
  scene = Experience;
}

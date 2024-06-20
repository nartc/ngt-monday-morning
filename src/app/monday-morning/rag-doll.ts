import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from "@angular/core";
import { injectBeforeRender } from "angular-three";
import { Group } from "three";
import { BodyPart } from "./body-part";
import { Box } from "./box";
import { joints } from "./config";

@Component({
  selector: "app-rag-doll",
  standalone: true,
  template: `
    <app-body-part name="upperBody">
      <app-body-part name="head" [config]="joints['neckJoint']">
        <ng-container body-part-parts>
          <ngt-group #eyes>
            <app-box
              color="black"
              [args]="[0.3, 0.01, 0.1]"
              [opacity]="0.8"
              [position]="[-0.3, 0.1, 0.5]"
              [transparent]="true"
            />
            <app-box
              color="black"
              [args]="[0.3, 0.01, 0.1]"
              [opacity]="0.8"
              [position]="[0.3, 0.1, 0.5]"
              [transparent]="true"
            />
          </ngt-group>
          <app-box
            #mouth
            color="#270000"
            [args]="[0.3, 0.05, 0.1]"
            [opacity]="0.8"
            [position]="[0, -0.2, 0.5]"
            [transparent]="true"
          />
        </ng-container>
      </app-body-part>

      <app-body-part name="upperLeftArm" [config]="joints['leftShoulder']">
        <app-body-part
          name="lowerLeftArm"
          [config]="joints['leftElbowJoint']"
        />
      </app-body-part>
      <app-body-part name="upperRightArm" [config]="joints['rightShoulder']">
        <app-body-part
          name="lowerRightArm"
          [config]="joints['rightElbowJoint']"
        />
      </app-body-part>
      <app-body-part name="pelvis" [config]="joints['spineJoint']">
        <app-body-part name="upperLeftLeg" [config]="joints['leftHipJoint']">
          <app-body-part
            name="lowerLeftLeg"
            [config]="joints['leftKneeJoint']"
          />
        </app-body-part>
        <app-body-part name="upperRightLeg" [config]="joints['rightHipJoint']">
          <app-body-part
            name="lowerRightLeg"
            [config]="joints['rightKneeJoint']"
          />
        </app-body-part>
      </app-body-part>
    </app-body-part>
  `,
  imports: [Box, BodyPart],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RagDoll {
  joints = joints;

  eyes = viewChild<ElementRef<Group>>("eyes");
  mouth = viewChild("mouth", { read: Box });

  constructor() {
    injectBeforeRender(({ clock }) => {
      const [eyes, mouth] = [this.eyes(), this.mouth()];
      if (eyes && mouth) {
        eyes.nativeElement.position.y =
          Math.sin(clock.getElapsedTime() * 1) * 0.06;
        mouth.boxRef().nativeElement.scale.y =
          (1 + Math.sin(clock.getElapsedTime())) * 1.5;
      }
    });
  }
}

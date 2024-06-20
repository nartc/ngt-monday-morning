import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  forwardRef,
  inject,
  input,
} from "@angular/core";
import { ConeTwistConstraintOpts, Triplet } from "@pmndrs/cannon-worker-api";
import { injectBox } from "angular-three-cannon/body";
import { injectConeTwist } from "angular-three-cannon/constraint";
import { createNoopInjectionToken } from "ngxtension/create-injection-token";
import { Object3D } from "three";
import { Box } from "./box";
import { shapes } from "./config";
import { injectDragConstraint } from "./drag-constraint";

function double([x, y, z]: Readonly<Triplet>): Triplet {
  return [x * 2, y * 2, z * 2];
}

const [injectParentRef, , ParentRef] = createNoopInjectionToken<
  ElementRef<Object3D>
>("parent body part ref");

@Component({
  selector: "app-body-part",
  standalone: true,
  template: `
    <app-box
      [scale]="shapeConfig().scale"
      [color]="shapeConfig().color"
      [name]="name()"
      [boxRef]="body.ref"
      (pointerdown)="dragConstraint.onPointerDown($event)"
      (pointerup)="dragConstraint.onPointerUp()"
    >
      <ng-content select="[body-part-parts]" />
    </app-box>

    <ng-content />
  `,
  providers: [
    {
      provide: ParentRef,
      useFactory: (bodyPart: BodyPart) => bodyPart.body.ref,
      deps: [forwardRef(() => BodyPart)],
    },
  ],
  imports: [Box],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyPart {
  parentRef = injectParentRef({ skipSelf: true, optional: true });

  name = input.required<keyof typeof shapes>();
  config = input<ConeTwistConstraintOpts>();

  shapeConfig = computed(() => {
    const { color, position, args, mass } = shapes[this.name()];
    return { color, scale: double(args), position, args, mass };
  });

  body = injectBox(() => ({
    args: [...this.shapeConfig().args],
    linearDamping: 0.99,
    mass: this.shapeConfig().mass,
    position: [...this.shapeConfig().position],
  }));

  dragConstraint = injectDragConstraint(this.body.ref);

  constructor() {
    const injector = inject(Injector);
    afterNextRender(() => {
      if (this.parentRef && this.config()) {
        injectConeTwist(this.body.ref, this.parentRef, {
          injector,
          options: this.config(),
        });
      }
    });
  }
}

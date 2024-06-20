import { ElementRef, inject, Injector, signal, untracked } from "@angular/core";
import { NgtThreeEvent } from "angular-three";
import {
  injectPointToPoint,
  NgtcConstraintReturn,
} from "angular-three-cannon/constraint";
import { injectAutoEffect } from "ngxtension/auto-effect";
import { Object3D } from "three";
import { injectCursorRef } from "./cursor";

export function injectDragConstraint(ref: ElementRef<Object3D>) {
  const cursorRef = injectCursorRef();
  const autoEffect = injectAutoEffect();
  const injector = inject(Injector);

  const api = signal<NgtcConstraintReturn<"PointToPoint">["api"]>(null!);

  autoEffect(() => {
    const cursor = cursorRef();
    if (!cursor) return;

    const pointToPoint = injectPointToPoint(cursor, ref, {
      options: { pivotA: [0, 0, 0], pivotB: [0, 0, 0] },
      injector,
      disableOnStart: true,
    });

    untracked(() => {
      api.set(pointToPoint.api);
    });
  });

  function onPointerDown(event: NgtThreeEvent<PointerEvent>) {
    event.stopPropagation();
    //@ts-expect-error Investigate proper types here.
    event.target.setPointerCapture(event.pointerId);
    api().enable();
  }

  function onPointerUp() {
    api().disable();
  }

  return { onPointerUp, onPointerDown };
}

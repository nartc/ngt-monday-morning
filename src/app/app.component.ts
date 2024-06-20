import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MondayMorning } from "./monday-morning/monday-morning";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <app-monday-morning />
  `,
  imports: [MondayMorning],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = "ngt-monday-morning";
}

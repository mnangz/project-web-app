import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by" style="text-align: centre;">
      Powered by <b><a href="https://entrisec.com" target="_blank"></a></b>
    </span>
  `,
})
export class FooterComponent {
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    document.body.classList.remove(...Array.from(document.body.classList));
    document.body.classList.add(...Array.from(["hold-transition", "layout-top-nav"]));
  }
}

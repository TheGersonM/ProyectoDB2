import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  showCarousel: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    document.body.classList.remove(...Array.from(document.body.classList));
    document.body.classList.add(...Array.from(["hold-transition", "layout-top-nav"]));

    this.router.events.subscribe(() => {
      this.showCarousel = this.router.url === '/main';
    });
  }
}

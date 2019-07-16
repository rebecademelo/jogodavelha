import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { JogadorComponent } from "./jogador/jogador.component";

const routes: Routes = [
  { path: 'app', component: AppComponent},
  { path: 'jogo', component: JogadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

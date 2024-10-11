import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  skills = [
    { name: 'Angular', level: 30 },
    { name: 'React', level: 85 },
    { name: 'Vue.js', level: 40 },
    { name: 'Node.js', level: 80 },
    { name: 'Next.js', level: 92 },
  ];

  newSkill = { name: '', level: 0 };

  addSkill() {
    if (this.newSkill.name && this.newSkill.level > 0) {
      this.skills.push({ ...this.newSkill });
      this.newSkill = { name: '', level: 0 };
    }
  }
}

import { Component, OnInit } from '@angular/core';

declare var ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  languages: string[] = ['Java', 'Python', 'C++'];
  language =  'Java';
  sessionId: string;
  defaultContent = {
    'Java': `public class Solution{
      public static void main(String[] args){
        // Please type your code here...
      }
    }`,
    'Python': `class Solution:
      def example():
        # Please type your code here...
    `,
    'C++': `int main(){
        /* Please type your code here... */
      }`
  }

  constructor() {
  }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.resetEditor();

  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode('ace/mode/' + this.language.toLowerCase());
  }

  submit(): void {
    let user_code = this.editor.getValue();
    console.log(user_code);
  }
}

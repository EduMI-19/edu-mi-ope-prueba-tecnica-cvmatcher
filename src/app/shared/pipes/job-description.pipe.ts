import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'jobDescription',
  standalone: true
})
export class JobDescriptionPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  private toProperTitle(text: string): string {
    if (!text) return '';
    return text.split(' ').map(word => {
      if (word.indexOf('.') !== -1) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }

  transform(description: string): SafeHtml {
    if (!description) return '';

    const headerKeywords = ['Requisitos', 'Ofrecemos', 'Funciones', 'Responsabilidades', 'BENEFICIOS'];
    const headerRegex = new RegExp(`^(${headerKeywords.join('|')})[:]?\\s*(.*)$`, 'i');
    const bulletRegex = /^[-*•]\s*/;

    const lines = description.split(/\r?\n/).filter(line => line.trim() !== '');
    let html = '';
    let i = 0;
    while (i < lines.length) {
      let line = lines[i].trim();

      if (bulletRegex.test(line)) {
        let bulletHtml = '<ul>';
        while (i < lines.length && bulletRegex.test(lines[i].trim())) {
          const bulletLine = lines[i].trim();
          const itemText = bulletLine.replace(bulletRegex, '');
          bulletHtml += `<li>${itemText}</li>`;
          i++;
        }
        bulletHtml += '</ul>';
        html += bulletHtml;
        continue;
      }

      const headerMatch = line.match(headerRegex);
      if (headerMatch) {
        const headerKeyword = headerMatch[1];
        let inlineContent = headerMatch[2] ? headerMatch[2].trim() : '';
        html += `<h3 class="subtitle">${this.toProperTitle(headerKeyword)}</h3>`;
        if (inlineContent) {
          html += `<p>${inlineContent}</p>`;
        }
        let additionalContent = '';
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j].trim();
          if (headerRegex.test(nextLine) || bulletRegex.test(nextLine)) {
            break;
          }
          additionalContent += nextLine + ' ';
          j++;
        }
        if (additionalContent.trim()) {
          html += `<p>${additionalContent.trim()}</p>`;
        }
        i = j;
      } else {
        html += `<p>${line}</p>`;
        i++;
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

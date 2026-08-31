import { loader } from 'fumadocs-core/source';
import { docs } from '../../.source/server.ts';

const source = loader({ source: docs.toFumadocsSource(), baseUrl: '/docs' });

const page = source.getPage(['timetable'], 'en');
const child = source.getPage(['timetable', 'teaching-load'], 'en');

console.log('index path:', page?.path);
console.log('index url:', page?.url);
console.log('child path:', child?.path);
console.log('child url:', child?.url);

if (page) {
  console.log('resolve ./teaching-load:', source.resolveHref('./teaching-load', page));
  console.log('resolve ./prerequisites:', source.resolveHref('./prerequisites', page));
}

const nested = source.getPage(['getting-started', 'enroll-students'], 'en');
if (nested) {
  console.log('enroll index path:', nested.path);
  console.log('resolve ./pre-inscriptions:', source.resolveHref('./pre-inscriptions', nested));
}

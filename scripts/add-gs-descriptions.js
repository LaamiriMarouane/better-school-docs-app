/**
 * Adds missing `description:` fields to getting-started MDX frontmatter.
 * Run from the docs app root: node scripts/add-gs-descriptions.js
 */
const fs = require('fs');
const path = require('path');

const descriptions = {
  'getting-started/index.mdx':
    'Step-by-step guides to set up your school, onboard staff and students, and start using the platform from day one.',
  'getting-started/welcome/index.mdx':
    'An introduction to the platform and a tour of what it can do for your school.',
  'getting-started/welcome/whats-included.mdx':
    'A tour of every module — academic management, gradebook, timetable, transport, payroll, communication, and more.',
  'getting-started/access-and-authentication/index.mdx':
    'How to log in, manage user accounts, reset passwords, and control who can access which parts of the platform.',
  'getting-started/common-concepts/index.mdx':
    'Core terms and ideas — academic years, classes, grades, attendance, and more — that appear throughout the platform.',
  'getting-started/common-concepts/academic-years-terms-and-statuses.mdx':
    'Understand how academic years and terms are structured, and how statuses control what can be edited or published.',
  'getting-started/common-concepts/assignments-quizzes-exams-and-grades.mdx':
    'How the three types of assessed work — assignments, quizzes, and scheduled exams — are created, graded, and combined into subject grades.',
  'getting-started/common-concepts/attendance-behaviour-and-payments.mdx':
    'An overview of how the platform tracks daily and session attendance, records student behaviour, and manages fee payments.',
  'getting-started/common-concepts/courses-subjects-and-classes.mdx':
    'How courses, subjects, levels, and classes relate to each other, and how content and grades are organised around them.',
  'getting-started/common-concepts/announcements-notifications-and-messaging.mdx':
    'The three communication channels — school-wide announcements, automated notifications, and real-time direct messages — and when to use each.',
  'getting-started/build-the-academic-foundation/index.mdx':
    'Set up academic years, terms, levels, subjects, and classes — the core structure every other feature builds on.',
  'getting-started/configure-core-operations/index.mdx':
    'Configure attendance modes, behaviour tracking, communication channels, fee plans, and the timetable before going live.',
  'getting-started/configure-core-operations/configure-attendance-modes.mdx':
    'Choose between per-session and per-day attendance for each level, and set up the rules that govern how absences are recorded.',
  'getting-started/configure-core-operations/configure-behaviour-tracking.mdx':
    'Set up behaviour categories, severity levels, and point values so teachers can log incidents and track student conduct.',
  'getting-started/configure-core-operations/configure-communication-channels.mdx':
    'Enable class channels, direct messaging, and broadcast announcements, and set who can initiate each type of conversation.',
  'getting-started/configure-core-operations/configure-fees-and-payment-plans.mdx':
    'Define fee plans, instalment schedules, and payment due dates so families receive automated reminders and can track what they owe.',
  'getting-started/configure-core-operations/configure-the-timetable.mdx':
    'Set the school\'s working days, period lengths, and room list before generating or publishing the timetable.',
  'getting-started/enroll-students/index.mdx':
    'Add students to the platform, assign them to classes and levels, and manage their enrolment and academic profiles.',
  'getting-started/first-time-school-setup/index.mdx':
    'The one-time steps to configure your school\'s name, logo, time zone, and core settings before inviting staff and students.',
  'getting-started/go-live-checklist/index.mdx':
    'A step-by-step checklist to confirm your school is ready: timetable published, roles verified, and first teaching cycle started.',
  'getting-started/go-live-checklist/publish-the-first-timetable.mdx':
    'Generate and publish the school timetable so teachers and students can view their schedules.',
  'getting-started/go-live-checklist/review-the-school-setup-checklist.mdx':
    'Run through the setup checklist to confirm academic structure, roles, and core configuration are complete before going live.',
  'getting-started/go-live-checklist/start-the-first-teaching-cycle.mdx':
    'Mark the academic year as active, start the first term, and confirm teachers can log attendance and enter grades.',
  'getting-started/go-live-checklist/validate-role-access.mdx':
    'Check that each role — admin, teacher, student, parent — can access exactly what it should before inviting real users.',
  'getting-started/manage-forms/index.mdx':
    'Create and publish admission forms, general school forms, and registration surveys that families can complete online.',
  'getting-started/onboard-people/index.mdx':
    'Invite and onboard administrators, teachers, students, and parents — assign roles, set permissions, and get everyone logged in.',
};

const contentDir = path.join(process.cwd(), 'content', 'docs');
let updated = 0;
let skipped = 0;

for (const [relPath, description] of Object.entries(descriptions)) {
  const fullPath = path.join(contentDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠ Not found: ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  if (content.includes('\ndescription:')) {
    console.log(`⟳ Already has description: ${relPath}`);
    skipped++;
    continue;
  }

  // Insert description: after the title: line
  content = content.replace(
    /^(---\ntitle: .+)(\n)/m,
    `$1\ndescription: ${description}$2`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Updated: ${relPath}`);
  updated++;
}

console.log(`\nDone. ${updated} updated, ${skipped} already had descriptions.`);

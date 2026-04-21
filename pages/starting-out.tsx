import SegmentPageLayout from '../components/SegmentPageLayout';
import WhyThisFits from '../components/proof/WhyThisFits';

export default function StartingOutPage() {
  return (
    <SegmentPageLayout
      meta={{
        title: 'Starting Out – Careira',
        description: 'Start your career with more clarity. Careira helps you understand your strengths, see where you fit, and avoid wasting time on roles that were never right for you.',
        slug: 'starting-out',
      }}
      hero={{
        headline: 'You have more to offer than a keyword scan will ever see',
        subheadline: 'Careira turns your skills, education, and potential into a real profile – then shows you roles that actually fit, with reasoning you can understand.',
      }}
      problem={{
        headline: 'The job market wasn\'t built for you yet',
        body: (
          <>
            <ul className="problem-list">
              <li>Applying everywhere, hearing nothing, wondering what you&apos;re doing wrong</li>
              <li>No way to tell which roles are worth your time &ndash; or why you keep getting filtered out</li>
              <li>Everyone says &ldquo;get experience&rdquo; but nobody shows you where yours actually counts</li>
            </ul>
            <p className="problem-close">
              Careira changes that. It reads what you&apos;ve done, maps it to real roles, and shows you exactly where you stand &ndash; no guessing.
            </p>
          </>
        ),
      }}
      howItWorks={{
        headline: 'How Careira works',
        steps: [
          {
            number: '01',
            title: 'Upload your CV',
            description: 'Even with limited experience, Careira builds a structured profile from your skills, education, and early career signals.',
          },
          {
            number: '02',
            title: 'See where you fit',
            description: 'Roles are scored against your profile. You see which ones align with your strengths – and why.',
          },
          {
            number: '03',
            title: 'Build momentum',
            description: 'Focus on roles worth pursuing. Every decision sharpens what comes next.',
          },
        ],
      }}
      outcomes={{
        headline: 'What changes when you can see clearly',
        items: [
          {
            title: 'Stop applying blind',
            description: 'See which roles genuinely match your strengths – before you spend time on them.',
          },
          {
            title: 'Build real momentum',
            description: 'Focus your energy on opportunities that are actually worth pursuing.',
          },
          {
            title: 'Know where you stand',
            description: 'Every match comes with clear reasoning, so you understand why something fits – or doesn\'t.',
          },
        ],
      }}
      proofArtifact={
        <WhyThisFits
          role="Marketing Coordinator"
          candidate="Alex Rivera"
          score={78}
          scoreLabel="Strong Alignment"
          reasoning={[
            'Communications degree with strong digital marketing coursework maps to role requirements',
            'Internship experience at a B2C brand demonstrates relevant hands-on skills',
            'Evidence of content creation and social media management aligns with day-to-day responsibilities',
            'Entry-level seniority expectation matches candidate\'s career stage',
          ]}
        />
      }
      proofHeadline="How Careira understands you"
      heroCtaText="See where you fit"
      ctaHeadline="Your career deserves a better starting point"
      ctaBody="Upload your CV. See where your strengths actually lead. Start with signal, not noise."
      variant="starting-out"
    />
  );
}

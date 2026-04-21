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
        headline: 'You have more to offer than keywords',
        subheadline: 'Careira turns your skills, education, and potential into a real profile – then shows you roles that actually fit, with reasoning you can understand.',
      }}
      problem={{
        headline: 'Starting a career shouldn\'t feel like guesswork',
        body: (
          <>
            <ul className="problem-list">
              <li>Roles that look right but lead nowhere</li>
              <li>Applications disappear without any sense of why</li>
              <li>No clear way to tell what&apos;s actually worth pursuing</li>
            </ul>
            <p>
              Everyone tells you to &ldquo;get experience&rdquo; &ndash; but no one shows you where yours actually counts.
            </p>
            <p className="problem-close">
              Careira changes that. It reads what you&apos;ve done, maps it to real roles, and shows you where you stand &ndash; clearly, and before you waste your time.
            </p>
          </>
        ),
      }}
      howItWorks={{
        headline: 'How Careira works',
        steps: [
          {
            number: '01',
            title: 'Tell us your story',
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

import SegmentPageLayout from '../components/SegmentPageLayout';
import WhyThisFits from '../components/proof/WhyThisFits';

export default function StartingAgainPage() {
  return (
    <SegmentPageLayout
      meta={{
        title: 'Starting Again – Careira',
        description: 'Get back into the market intelligently. Careira helps you turn your experience into a clear professional profile, see which roles genuinely fit, and move forward with more confidence.',
        slug: 'starting-again',
      }}
      hero={{
        headline: 'Get back into the market intelligently',
        subheadline: 'Careira helps you turn your experience into a clear professional profile, see which roles genuinely fit, and move forward with more confidence.',
      }}
      problem={{
        headline: 'Returning to the market shouldn\'t mean starting from scratch',
        body: (
          <>
            <ul className="problem-list">
              <li>Years of experience, but the market treats you like a new applicant</li>
              <li>Keyword filters ignore the depth of what you&apos;ve done</li>
              <li>Time wasted on roles that looked right but weren&apos;t viable</li>
            </ul>
            <p className="problem-close">
              Careira captures the full picture of your experience and shows you where it still carries weight – and where real constraints might conflict.
            </p>
          </>
        ),
      }}
      howItWorks={{
        headline: 'How it works',
        steps: [
          {
            number: '01',
            title: 'Upload your CV',
            description: 'Your full career history is parsed into a structured profile – capturing depth that keyword filters miss.',
          },
          {
            number: '02',
            title: 'See where you still fit',
            description: 'Roles are evaluated against your real experience. Preference conflicts surface early, before you invest time.',
          },
          {
            number: '03',
            title: 'Move forward with clarity',
            description: 'Focus on roles where your experience genuinely carries weight. Each decision refines future matches.',
          },
        ],
      }}
      outcomes={{
        headline: 'What changes when fit becomes clearer',
        items: [
          {
            title: 'Regain control',
            description: 'Your experience is translated into a structured profile – not reduced to keywords.',
          },
          {
            title: 'See real constraints',
            description: 'Preference conflicts surface early, before you invest time in the wrong roles.',
          },
          {
            title: 'Move forward with confidence',
            description: 'Clear fit reasoning helps you make informed decisions, not hopeful guesses.',
          },
        ],
      }}
      proofArtifact={
        <WhyThisFits
          role="Operations Manager"
          candidate="Rachel Foster"
          score={68}
          scoreLabel="Strong Alignment"
          reasoning={[
            '12 years operational leadership experience directly relevant to role scope',
            'Process improvement and team management track record matches core requirements',
            'Industry experience in logistics aligns with hiring company\'s sector',
          ]}
          considerations={[
            'No recent exposure to digital transformation or process automation initiatives',
            'Limited evidence of recent stakeholder management at director level',
          ]}
        />
      }
      heroCtaText="See where you fit"
      proofHeadline="How Careira surfaces real-world tensions"
      ctaHeadline="Your experience deserves better than keyword filters"
      ctaBody="Upload your CV. See where your experience still carries weight – and where the real constraints are."
      variant="starting-again"
    />
  );
}

import SegmentPageLayout from '../components/SegmentPageLayout';
import StrengthsGapsRisks from '../components/proof/StrengthsGapsRisks';

export default function SteppingUpPage() {
  return (
    <SegmentPageLayout
      meta={{
        title: 'Stepping Up – Careira',
        description: 'Make a better next move. Careira helps experienced professionals focus on the roles that genuinely fit, understand why, and move with more confidence.',
        slug: 'stepping-up',
      }}
      hero={{
        headline: 'Make a better next move',
        subheadline: 'At this level, the wrong role costs years. Careira gives you the depth to judge fit properly – so you move with precision, not hope.',
      }}
      problem={{
        headline: 'Seniority makes fit harder to judge, not easier',
        body: (
          <>
            <ul className="problem-list">
              <li>Roles look similar on the surface but differ in ways that matter</li>
              <li>A wrong move at this level costs years, not months</li>
              <li>No tools give you signal about what actually fits</li>
            </ul>
            <p className="problem-close">
              Careira evaluates fit across the dimensions that matter at senior level – and shows you where the strengths, gaps, and risks actually are.
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
            description: 'Your senior experience is parsed into a detailed capability profile – seniority, domain depth, functional breadth.',
          },
          {
            number: '02',
            title: 'Evaluate fit at depth',
            description: 'Each role is scored across dimensions that matter at your level – scope, autonomy, domain complexity, team structure.',
          },
          {
            number: '03',
            title: 'Be more selective',
            description: 'Focus only on roles with genuine fit. Strengths, gaps, and risks are surfaced before you invest time.',
          },
        ],
      }}
      outcomes={{
        headline: 'What changes when you can see clearly',
        items: [
          {
            title: 'Be more selective',
            description: 'Focus only on roles where there\'s a genuine chance of strong fit.',
          },
          {
            title: 'See the full picture',
            description: 'Strengths, gaps, and risks – evaluated against the actual requirements of each role.',
          },
          {
            title: 'Make a stronger move',
            description: 'Decisions backed by clear reasoning, not intuition alone.',
          },
        ],
      }}
      proofArtifact={
        <StrengthsGapsRisks
          strengths={[
            'VP-level P&L ownership with 15 years of commercial leadership',
            'Proven track record scaling teams from 20 to 80+ across two divisions',
            'Deep domain expertise in financial services and fintech',
            'Board-level stakeholder management and reporting experience',
          ]}
          gaps={[
            'No direct international market expansion experience',
            'Limited exposure to private equity-backed operating models',
          ]}
          risks={[
            'Current total compensation may exceed role budget at target equity split',
          ]}
        />
      }
      heroCtaText="Evaluate your options"
      proofHeadline="What senior-level fit evaluation looks like"
      ctaHeadline="Your next move should be your strongest"
      ctaBody="See which roles genuinely match your level, scope, and ambition – before you invest time."
      variant="stepping-up"
    />
  );
}

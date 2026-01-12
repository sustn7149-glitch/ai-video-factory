import ProposalView from "./ProposalView";

export default async function ProposalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProposalView agentId={id} />;
}

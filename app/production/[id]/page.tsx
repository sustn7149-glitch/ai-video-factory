import VideoEditor from "./VideoEditor";

export default async function VideoEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <VideoEditor id={id} />;
}

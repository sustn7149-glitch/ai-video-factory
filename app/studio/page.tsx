import StudioClient from "./StudioClient";

export default async function StudioPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { project } = await searchParams;
    const projectId = typeof project === 'string' ? project : '1'; 
    
    return <StudioClient id={projectId} />;
}

import { Parser } from '@asyncapi/parser';
import { DocumentInfo } from '@/types';

export default async function parseURL(base64Document: string): Promise<DocumentInfo | null> {
    const parser = new Parser();
    
    const decodedDocument = Buffer.from(base64Document, "base64").toString("utf-8");
    const { document, diagnostics } = await parser.parse(decodedDocument);

    if (diagnostics.length !== 0) {
        return null;
    }

    let title = document?.info().title();
    if (title !== undefined) {
        title = title.length <= 20 ? title : title.slice(0, 20) + "...";
    }
    const version = document?.info().version();

    let description = document?.info().description();
    if (description !== undefined) {
        description = description.length <= 100 ? description : description.slice(0, 100) + "...";
    }

    const servers = document?.allServers();
    const channels = document?.allChannels();
    
    const numServers = servers?.length;
    const numChannels = channels?.length;

    const response = {
        title,
        version,
        description,
        numServers,
        numChannels
    };
    return response;
}


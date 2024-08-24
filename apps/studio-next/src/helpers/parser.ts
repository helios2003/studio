import { Input, Parser } from '@asyncapi/parser';
import { DocumentInfo } from '@/types';

function cleanTheDocument(input: string): string {
    // use standard line breaks and remove all non-printable characters
    let cleanedDocument = input.replace(/\r\n|\r|\n/g, '\n');
    cleanedDocument = cleanedDocument.replace(/[^\x20-\x7E\n]/g, '');
    
    if (!cleanedDocument.endsWith('\n')) {
        cleanedDocument += '\n';
    }
    
    return cleanedDocument;
}

export default async function parseURL(asyncapiDocument: string): Promise<DocumentInfo | null> {
    const parser = new Parser();

    let decodedDocument: Input = "";

    if (asyncapiDocument.startsWith('https') || asyncapiDocument.startsWith('http')) {
        decodedDocument = asyncapiDocument;
    } else {
        asyncapiDocument.replace(/\s/g, '');
        decodedDocument = atob(asyncapiDocument);
        console.log(decodedDocument);
    }
    decodedDocument = cleanTheDocument(decodedDocument);
    const { document, diagnostics } = await parser.parse(decodedDocument);
    console.log("Diagnostics are: ", diagnostics);
    if (diagnostics.length) {
        return null;
    }

    let title = document?.info().title();
    if (title) {
        title = title.length <= 20 ? title : title.slice(0, 20) + "...";
    }
    const version = document?.info().version();

    let description = document?.info().description();
    if (description) {
        description = description.length <= 100 ? description : description.slice(0, 100) + "...";
    }

    const servers = document?.allServers();
    const channels = document?.allChannels();
    const operations = document?.allOperations();
    const messages = document?.allMessages();

    const numServers = servers?.length;
    const numChannels = channels?.length;
    const numOperations = operations?.length;
    const numMessages = messages?.length;

    const response = {
        title,
        version,
        description,
        numServers,
        numChannels,
        numOperations,
        numMessages
    };
    return response;
}

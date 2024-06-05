import { Parser } from '@asyncapi/parser';
import { DocumentInfo } from '@/types';

export default async function parseURL(base64Document: string): Promise<DocumentInfo> {
    const parser = new Parser();
    const decodedDocument = Buffer.from(base64Document, "base64").toString("utf-8");
    
    const { document } = await parser.parse(decodedDocument);

    const extractInfo = async () => {
        const info = document?.info();
        
        let title = info?.title();
        if (title) {
            title = title.length <= 20 ? title : title.slice(0, 20) + "...";
        }
        
        const version = info?.version();
        
        let description = info?.description();
        if (description) {
            description = description.length <= 100 ? description : description.slice(0, 100) + "...";
        }

        return { title, version, description };
    };

    async function extractServers() {
        const servers = document?.allServers();
        const numServers = servers ? Object.keys(servers).length : 0;
        return numServers;
    };

    async function extractChannels() {
        const channels = document?.allChannels();
        const numChannels = channels ? Object.keys(channels).length : 0;
        return numChannels;
    };

    const [info, numServers, numChannels] = await Promise.all([
        extractInfo(),
        extractServers(),
        extractChannels()
    ]);

    return {
        ...info,
        numServers,
        numChannels
    };
}

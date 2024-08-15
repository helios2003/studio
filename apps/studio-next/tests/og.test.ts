import { fetchOpenGraphTags } from "./fetchogtags";

// list of sample crawlers to test with
const facebookCrawler = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
const XCrawler = 'Twitterbot/1.0';
const SlackCrawler = 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)';

// Testing with base64 query param
const base64url = "https://studio-studio-next.vercel.app/?base64=YXN5bmNhcGk6IDMuMC4wCmluZm86CiAgdGl0bGU6IEFjY291bnQgU2VydmljZQogIHZlcnNpb246IDEuMC4wCiAgZGVzY3JpcHRpb246IFRoaXMgc2VydmljZSBpcyBpbiBjaGFyZ2Ugb2YgcHJvY2Vzc2luZyB1c2VyIHNpZ251cHMKY2hhbm5lbHM6CiAgdXNlclNpZ25lZHVwOgogICAgYWRkcmVzczogdXNlci9zaWduZWR1cAogICAgbWVzc2FnZXM6CiAgICAgIFVzZXJTaWduZWRVcDoKICAgICAgICAkcmVmOiAnIy9jb21wb25lbnRzL21lc3NhZ2VzL1VzZXJTaWduZWRVcCcKb3BlcmF0aW9uczoKICBzZW5kVXNlclNpZ25lZHVwOgogICAgYWN0aW9uOiBzZW5kCiAgICBjaGFubmVsOgogICAgICAkcmVmOiAnIy9jaGFubmVscy91c2VyU2lnbmVkdXAnCiAgICBtZXNzYWdlczoKICAgICAgLSAkcmVmOiAnIy9jaGFubmVscy91c2VyU2lnbmVkdXAvbWVzc2FnZXMvVXNlclNpZ25lZFVwJwpjb21wb25lbnRzOgogIG1lc3NhZ2VzOgogICAgVXNlclNpZ25lZFVwOgogICAgICBwYXlsb2FkOgogICAgICAgIHR5cGU6IG9iamVjdAogICAgICAgIHByb3BlcnRpZXM6CiAgICAgICAgICBkaXNwbGF5TmFtZToKICAgICAgICAgICAgdHlwZTogc3RyaW5nCiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBOYW1lIG9mIHRoZSB1c2VyCiAgICAgICAgICBlbWFpbDoKICAgICAgICAgICAgdHlwZTogc3RyaW5nCiAgICAgICAgICAgIGZvcm1hdDogZW1haWwKICAgICAgICAgICAgZGVzY3JpcHRpb246IEVtYWlsIG9mIHRoZSB1c2Vy";
const accountServiceTags = {
    "og:title": 'Account Service',
    "og:description": 'This service is in charge of processing user signups',
    "og:image": 'https://ogp-studio.netlify.app/og?title=Account+Service&description=This+service+is+in+charge+of+processing+user+signups&numChannels=1&numOperations=1&numMessages=1'
}

describe('Testing the document with base64 query parameter for various open graph crawlers ', () => {
    test('Test Open Graph tags for Facebook', async () => {
        const openGraphTags = await fetchOpenGraphTags(base64url, facebookCrawler);
        expect(openGraphTags).toEqual(accountServiceTags);
    });

    test('Test Open Graph tags for X', async () => {
        const openGraphTags = await fetchOpenGraphTags(base64url, XCrawler);
        expect(openGraphTags).toEqual(accountServiceTags);
    });

    test('Test Open Graph tags for Slack', async () => {
        const openGraphTags = await fetchOpenGraphTags(base64url, SlackCrawler);
        expect(openGraphTags).toEqual(accountServiceTags);
    });
})

// Testing with url query param
const externalDocUrl = 'https://studio-studio-next.vercel.app/?url=https://raw.githubusercontent.com/asyncapi/spec/master/examples/mercure-asyncapi.yml';
const mercurHubTags = {
    "og:title": 'Mercure Hub Example',
    "og:description": 'This example demonstrates how to define a Mercure hub.',
    "og:image": 'https://ogp-studio.netlify.app/og?title=Mercure+Hub+Example&description=This+example+demonstrates+how+to+define+a+Mercure+hub.&numServers=1&numChannels=1&numOperations=2&numMessages=1'
}

describe('Testing the document with url query parameter for various open graph crawlers', () => {
    test('Test Open Graph tags for Facebook', async () => {
        const facebookCrawler = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
        const openGraphTags = await fetchOpenGraphTags(externalDocUrl, facebookCrawler);
        expect(openGraphTags).toEqual(mercurHubTags);
    });

    test('Test Open Graph tags for X', async () => {
        const XCrawler = 'Twitterbot/1.0';
        const openGraphTags = await fetchOpenGraphTags(externalDocUrl, XCrawler);
        expect(openGraphTags).toEqual(mercurHubTags);
    });

    test('Test Open Graph tags for Slack', async () => {
        const SlackCrawler = 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)';
        const openGraphTags = await fetchOpenGraphTags(externalDocUrl, SlackCrawler);
        expect(openGraphTags).toEqual(mercurHubTags);
    });
})
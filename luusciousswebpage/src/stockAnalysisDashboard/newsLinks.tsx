import styled from 'styled-components';
import { PrimaryColor } from './stockAnalysisDashboard';

interface NewsItem {
    title: string;
    link: string;
}

interface NewsLinksProps {
    newsLinks: NewsItem[];
    maxItems?: number;
    newsPageLink: string;
}

const NewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

const NewsLink = styled.a`
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    color: ${PrimaryColor};
    text-decoration: none;
    margin-bottom: 4px;
    &:hover {
        text-decoration: underline;
    }
`;

const ViewAll = styled.a`
    font-size: 11px;
    text-decoration: none;
    margin-top: 4px;
    opacity: 0.7;
    color: black;
    &:hover {
        text-decoration: underline;
        opacity: 1;
    }
`;

export default function NewsLinks({
    newsLinks,
    maxItems = 4,
    newsPageLink
}: NewsLinksProps) {

    const displayedNews = newsLinks.slice(0, maxItems);

    return (
        <NewsContainer>
            <div>In the News</div>
            <div>
                {displayedNews.map((news, index) => (
                    <NewsLink
                        key={`${news.link}-${index}`}
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={news.title}
                    >
                        {news.title}
                    </NewsLink>
                ))}

                <ViewAll
                    href={newsPageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View all news →
                </ViewAll>
            </div>
        </NewsContainer>
    );
}
import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import SidebarLayout from '../layout/SidebarLayout'
import FlexibleContent from '../components/FlexibleContent'
import ArrowLink from '../components/ArrowLink'
import PaginationLinks from '../components/PaginationLinks'
import LetterSlide from '../components/LetterSlide'

export default function Docs(props) {
  const {
    wordsbyCollections: { post_type, post_title, post_content, acf },
  } = props.data

  const { nextPost, previousPost } = props.pageContext

  return (
    <SidebarLayout>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Gatsby Plugin Transition Link</title>
      </Helmet>
      {post_type === 'documentation' && (
        <ArrowLink direction="left" light={1} to="/usage/">
          Table of contents
        </ArrowLink>
      )}
      <main role="main">
        <LetterSlide>{!!post_title && <h1>{post_title}</h1>}</LetterSlide>
        {!!post_content && (
          <div dangerouslySetInnerHTML={{ __html: post_content }} />
        )}
        {!!acf && <FlexibleContent rows={acf.content_collection} />}

        <PaginationLinks>
          {!!previousPost &&
            !!previousPost.pathname &&
            previousPost.post_type === 'page' &&
            previousPost.post_type === post_type && (
              <ArrowLink direction="left" to={previousPost.pathname}>
                {!!previousPost && !!previousPost.post_title
                  ? `back to ${previousPost.post_title}`
                  : 'Previous post'}
              </ArrowLink>
            )}
          {!!nextPost &&
            !!nextPost.pathname &&
            nextPost.post_type === 'page' &&
            nextPost.post_type === post_type && (
              <ArrowLink direction="right" to={nextPost.pathname}>
                {!!nextPost && !!nextPost.post_title
                  ? `up next ${nextPost.post_title}`
                  : 'Next post'}
              </ArrowLink>
            )}
        </PaginationLinks>
      </main>
    </SidebarLayout>
  )
}

export const CollectionQuery = graphql`
  query Docs($id: Int!) {
    wordsbyCollections(ID: { eq: $id }) {
      post_title
      post_content
      post_type
      acf {
        content_collection {
          __typename
          ... on WordPressAcf_markdown {
            markdown
          }

          # ... on WordPressAcf_menu {
          #   menu {
          #     wordpress_id
          #     name
          #     slug
          #   }
          # }

          ... on WordPressAcf_image {
            image {
              url {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }

          ... on WordPressAcf_card_grid {
            cards {
              title
              link
              link_type {
                name
              }
              transition
              duration
              direction
              bg
              top
            }
          }

          ... on WordPressAcf_table_of_contents {
            title
            menu {
              slug
            }
            type
            hash_links {
              label
              link
            }
          }

          ... on WordPressAcf_box {
            title
            content
          }
        }
      }
    }
  }
`

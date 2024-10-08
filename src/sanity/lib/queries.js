import { groq } from 'next-sanity'

// Construct our "home" page GROQ
export const homeID = groq`*[_type=="pHome"][0]._id`

// Construct our "link" GROQ
const link = groq`
	_type,
	route,
	isNewTab
`

// Construct our "menu" GROQ
const menu = groq`
	_key,
	_type,
	title,
	items[]{
		title,
		link {
			${link}
		},
		dropdownItems[]{
			_key,
			title,
			link {
				${link}
			},
		}
	}
`

// Construct our "image meta" GROQ
export const imageMeta = groq`
	asset,
  crop,
  customRatio,
  hotspot,
  ...asset -> {
    "id": assetId,
    "alt": coalesce(^.alt, altText),
    "type": mimeType,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
    "aspectRatio": metadata.dimensions.aspectRatio,
    "lqip": metadata.lqip
   }
`

export const callToAction = groq`
	label,
	link {
		${link}
	},
	"isButton": true
`

// Construct our "portable text content" GROQ
export const portableTextContent = groq`
	...,
	markDefs[]{
		...,
		_type == "link" => {
			${link}
		},
		_type == "callToAction" => {
			${callToAction}
		}
	},
	_type == "image" => {
		${imageMeta}
	}
`

export const freeformObj = groq`
	...,
	_type,
	_key,
	content[]{
		${portableTextContent}
	},
	sectionAppearance
`

// Construct our content "modules" GROQ
export const pageModules = groq`
	_type == 'freeform' => {
		${freeformObj}
	},
	_type == 'carousel' => {
		_type,
		_key,
		items,
		autoplay,
		autoplayInterval,
	},
	_type == 'marquee' => {
		_type,
		_key,
		items[]{
			_type == 'simple' => {
				_type,
				text
			},
			_type == 'image' => {
				_type,
				"image": {
					${imageMeta}
				}
			}
		},
		speed,
		reverse,
		pausable
	},
`

const customForm = groq`
		customForm {
			formFields[] {
				placeholder,
				_key,
				required,
				fieldLabel,
				inputType,
				selectOptions
			}
		}`

// Construct our "site" GROQ
export const site = groq`
	"site": {
		"title": *[_type == "settingsGeneral"][0].siteTitle,
		"favicon": *[_type == "settingsGeneral"][0].favicon,
		"faviconLight": *[_type == "settingsGeneral"][0].faviconLight,
		"announcement": *[_type == "gAnnouncement"][0]{
			display,
			messages,
			autoplay,
			autoplayInterval,
			backgroundColor,
			textColor,
			emphasizeColor,
			"link": ${link}
		},
		"header": *[_type == "gHeader"][0]{
			menu{
				${menu}
			},
			keyText,
			mobileImage{
				${imageMeta}
			}
		},
		"footer": *[_type == "gFooter"][0]{
			menu->{
				${menu}
			},
			menuLegal->{
				${menu}
			},
		},
		"sharing": *[_type == "settingsSharing"][0]{
			shareGraphic,
		},
		"integrations": *[_type == "settingsIntegration"][0]{
			gtmID,
			gaID,
			KlaviyoApiKey,
		},
	}
`

export const pageHomeQuery = `
	*[_type == "pHome"][0]{
		title,
		"slug": slug.current,
		sharing,
		"isHomepage": true,
		titleEnglish,
		titleKorean,
		titleImage{
			${imageMeta}
		},
		mainImage{
			${imageMeta}
		}
	}
`

export const page404Query = `*[_type == "p404" && _id == "p404"][0]{
	heading,
	"slug": "404",
	paragraph[]{
		${portableTextContent}
	},
	callToAction{
		${callToAction}
	}
}`

export const pagesBySlugQuery = groq`
	*[_type == "pGeneral" && slug.current == $slug][0]{
			title,
			"slug": slug.current,
			sharing,
			pageModules[]{
				${pageModules}
			},
	}`

export const getBlogPostData = (type) => {
  let defaultData = groq`
		_type,
		_id,
		title,
		"slug": slug.current,
		author->{name},
		categories[]-> {
			_id,
			title,
			"slug": slug.current,
			categoryColor->{...color}
		},`
  if (type === 'card') {
    defaultData += groq`excerpt`
  } else {
    defaultData += groq`
		content[]{
			${portableTextContent}
		}`
  }
  return defaultData
}

export const articleListAllQuery = groq`
		"articleList": *[_type == "pBlog"] | order(_updatedAt desc) {
			${getBlogPostData('card')}
		}
`

export const pageBlogIndexDefaultQuery = groq`
		_type,
		title,
		"slug": "blog",
		articlesPerPage,
		paginationMethod,
		loadMoreButtonLabel,
		infiniteScrollCompleteLabel,
		"articleTotalCount": count(*[_type == "pBlog"]),
		sharing`

export const pageBlogIndex = groq`
	*[_type == "pBlogIndex"][0]{
		${pageBlogIndexDefaultQuery}
	}`

export const pageBlogIndexWithArticleDataSSGQuery = groq`
	*[_type == "pBlogIndex"][0]{
		${pageBlogIndexDefaultQuery},
		${articleListAllQuery}
	}`

export const pageBlogPaginationMethodQuery = groq`
	{
		"articleTotalNumber": count(*[_type == "pBlog"])}
		"articlesPerPage": *[_type == "pBlogIndex"][0].articlesPerPage
	}`

export const pageBlogSingleQuery = groq`
	*[_type == "pBlog" && slug.current == $slug][0]{
		${getBlogPostData()},
		"defaultRelatedBlogs": *[_type == "pBlog"
			&& count(categories[@._ref in ^.^.categories[]._ref ]) > 0
			&& _id != ^._id
			] | order(publishedAt desc, _createdAt desc) [0..1] {
				${getBlogPostData('card')}
			}
	}`

export const pageContactQuery = groq`
	*[_type == "pContact"][0]{
		title,
		"slug": slug.current,
		contactForm {
			formTitle,
			${customForm},
			successMessage,
			errorMessage,
		}
	}
`

export const pageAboutQuery = groq`
	*[_type == "pAbout"][0]{
		title,
		"slug": slug.current,
		content[]{
			${portableTextContent}
		},
		image{
			${imageMeta}
		}
	}
`

export const projectQuery = `
	title,
	"slug": slug.current,
	date,
	category,
	skills,
	contribution,
	timeline,
	content[]{
		${portableTextContent}
	},
	thumbnail{
		${imageMeta}
	},
	mainImage{
		${imageMeta}
	},
	gallery[]{
		heading,
		images[]{
			${imageMeta}
		}
	}
`

export const pageDesignSingleQuery = groq`
	*[_type == "pDesign" && slug.current == $slug][0]{
		${projectQuery}
	}
`

export const pageArtSingleQuery = groq`
	*[_type == "pArt" && slug.current == $slug][0]{
		${projectQuery}
	}
`

export const pageDesignIndex = groq`
	*[_type == "pDesignIndex"][0]{
		title,
		"projects": *[_type == "pDesign"]|order(orderRank){
			${projectQuery}
		}
	}
`

export const pageArtIndex = groq`
	*[_type == "pArtIndex"][0]{
		title,
		"projects": *[_type == "pArt"]|order(orderRank){
			${projectQuery}
		}
	}
`

// new pages below...
// export const pageAboutQuery = groq`;
// 	*[_type == "pSpace"][0]{
// 			title,
// 			"slug": slug.current,
// 			sharing
// 	}`;

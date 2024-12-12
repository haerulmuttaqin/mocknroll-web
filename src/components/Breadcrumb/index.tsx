'use client'

import React from 'react'
import {usePathname} from 'next/navigation'
import Breadcrumbs, {BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import {BreadcrumbProps} from "@component/Breadcrumb/breadcrumb";
import {useRouter} from "next/router";
import {isNumeric} from "rxjs/util/isNumeric";
import {toTitleCase} from "@/utils/string.extentions";
import HomeIcon from '@atlaskit/icon/glyph/home'

const BreadcrumbList = () => {

    return (
        <AppBreadcrumb
            homeElement={'Home'}
            capitalizeLinks
        />
    )
};
export default BreadcrumbList;

const AppBreadcrumb = ({capitalizeLinks}: BreadcrumbProps) => {

    const router = useRouter()

    const paths = usePathname()
    const pathNames = paths?.split('/').filter(path => path)

    const handleClick = (href: string) => {
        router.push(href)
    }

    const {action} = router.query

    return (
        <Breadcrumbs>
            <BreadcrumbsItem text="" iconBefore={<HomeIcon size="small" label={"home"} />} key="ATCS" onClick={() => handleClick("/")}/>
            {
                pathNames?.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`
                    let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                    if (isNumeric(itemLink) && action == "edit") {
                        itemLink = "Edit"
                    }
                    return (
                        <BreadcrumbsItem key={index} text={toTitleCase(itemLink.replaceAll("_", " ").replaceAll("%20", " ").replaceAll("-", " "))}
                                         onClick={() => handleClick(href)}/>
                    )
                })
            }
        </Breadcrumbs>
    )
}
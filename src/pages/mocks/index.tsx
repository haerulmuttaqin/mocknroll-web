import type {NextPage} from "next";
import React, {useCallback, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import ButtonGroup from '@atlaskit/button/button-group';
import Button, {IconButton} from '@atlaskit/button/new';
import {Box, Inline, xcss} from '@atlaskit/primitives';
import TextField from '@atlaskit/textfield';
import SearchIcon from '@atlaskit/icon/glyph/search'
import {useRouter} from "next/router";
import Select from "@atlaskit/select";
import DynamicTable from "@atlaskit/dynamic-table";
import {createKey, filterByValue, getMethodType} from "@utils/utils";
import EmptyState from "@atlaskit/empty-state";
import {showFlag} from "@store/actions/show-flag";
import {useDispatch} from "react-redux";
import Modal, {ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition,} from '@atlaskit/modal-dialog';
import Tooltip from "@atlaskit/tooltip";
import {OptionProps} from "@api/data/interfaces";
import DropdownMenu, {DropdownItem, DropdownItemGroup} from "@atlaskit/dropdown-menu";
import MoreIcon from "@atlaskit/icon/glyph/more";
import {ProjectProps} from "@api/data/interfaces/project";
import Lozenge from "@atlaskit/lozenge";
import {filterFlexItemStyle} from "@styles/styles";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import Auth from "@protected/auth";
import {useTranslation} from "next-i18next";
import {useFetchProjects} from "@pages/projects/data/remote";
import {useFetchMocks} from "@pages/mocks/data/remote";
import {MockProps} from "@api/data/interfaces/mock";
import {deleteMock} from "@api/data/services/mock";
import {Code} from "@atlaskit/code";

const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const ViewProject: NextPage = () => {
    const {t} = useTranslation(["common"])
    const dispatch = useDispatch();
    const router = useRouter()
    const {mid, pid, sid, idx, action} = router.query
    const [statusActive, setConfigTypes] = useState<OptionProps[]>([
        {value: 1, label: "Active"},
        {value: 0, label: "Inactive"},
    ])
    const [filterType, setFilterType] = useState<string>("1")
    const [filterQuery, setFilterQuery] = useState<string>("")
    const [shouldBeDelete, setShouldBeDelete] = useState<MockProps | undefined>()
    const onFilterQueryChange = (e: any) => {
        setFilterQuery(e.target.value)
    }
    const [isOpenAlertDelete, setIsOpenAlertDelete] = useState(false);
    const openModalDelete = useCallback(() => setIsOpenAlertDelete(true), []);
    const closeModalDelete = useCallback(() => setIsOpenAlertDelete(false), []);

    const {
        data: dataMocks,
        isLoading: isLoadingMocks,
        mutate: mutateMocks,
        error: errorMocks
    } = useFetchMocks(pid as string, sid as string)

    const {
        data: dataProjects,
        isLoading: isLoadingProjects,
        mutate: mutateProjects,
        error: errorProjects
    } = useFetchProjects()

    const onFilterTypeChange = (option: any) => {
        setFilterType(option ? option.value : 1)
    }
    const doDelete = async (params: ProjectProps) => {
        closeModalDelete()
        await deleteMock(pid as string, sid as string, params.idx as any, params.id as string)
            .then((res: any) => {
                if (!res.success) {
                    dispatch(
                        showFlag({
                            success: false,
                            title: "Delete Failed, Please try again.",
                            message: res.message
                        }) as any
                    );
                } else {
                    setShouldBeDelete(undefined)
                    mutateMocks()
                    dispatch(
                        showFlag({
                            success: true,
                            title: "Successfully Deleted.",
                            message: "The project has been successfully deleted!",
                            goBack: false
                        }) as any
                    )
                }
            })
            .catch((err: any) => {
                dispatch(
                    showFlag({
                        success: false,
                        title: "Delete Failed, Please try again.",
                        message: err.message
                    }) as any
                );
            })
    }
    const handleClickNew = () => {
        router.push(`/mocks/create/?pid=${pid}&sid=${sid}&idx=${idx}`)
    }
    const handleOnShow = (mid: string, pid?: string, sid?: string, idx?: number) => {
        router.push(`/mocks/${mid}?action=view&pid=${pid}&sid=${sid}&idx=${idx}`)
    }
    const handleOnEdit = (mid: string, pid?: string, sid?: string, idx?: number) => {
        router.push(`/mocks/${mid}?action=edit&pid=${pid}&sid=${sid}&idx=${idx}`)
    }
    const handleOpenModalDelete = (params: MockProps) => {
        setShouldBeDelete(params)
        openModalDelete()
    }
    const handleOnDelete = () => {
        doDelete(shouldBeDelete as any)
    }

    useEffect(() => {
        mutateMocks()
    }, []);

    useEffect(() => {
        if ((dataProjects == undefined) && errorMocks) {
            dispatch(
                showFlag({
                    success: false,
                    title: "Failed While Loading Project Data.",
                    message: "An error occurred!",
                }) as any
            )
        }
    }, [])

    const head = {
        cells: [
            {
                key: 'method',
                content: 'Method',
                isSortable: true,
            },
            {
                key: 'endpoint',
                content: 'Endpoint',
                isSortable: true,
            },
            {
                key: 'name',
                content: 'Name',
                isSortable: true,
            },
            {
                key: 'code',
                content: 'Code',
                isSortable: true,
            },
            {
                key: 'more',
                content: 'Action',
                shouldTruncate: true,
            },
        ],
    };

    const dataWithFilterQuery = (filterQuery == "" ? dataMocks : filterByValue(dataMocks, filterQuery))
    const dataWithFilterType = (filterType == "1" ? dataWithFilterQuery : dataWithFilterQuery.filter((filter: ProjectProps) => filter.is_active == filterType))
    const rows = dataWithFilterType?.map(
        (row: MockProps, index: number) => ({
            key: `row-${index}-${row.id}`,
            isHighlighted: false,
            cells: [
                {
                    key: row.method,
                    content: (
                        <Tooltip content={row.endpoint}>
                            {(tooltipProps) => (
                                <Box {...tooltipProps} xcss={xcss({color: "color.text", cursor: "pointer"})}
                                     onClick={() => handleOnShow(row.id, row.pid, row.sid, row.idx)}>
                                    <Lozenge
                                        appearance={getMethodType(row.method)}>{row.method}</Lozenge>
                                </Box>
                            )}
                        </Tooltip>
                    ),
                },
                {
                    key: createKey(row.endpoint?.toString()),
                    content: (
                        <Tooltip content={row.endpoint}>
                            {(tooltipProps) => (
                                <Box {...tooltipProps} xcss={xcss({color: "color.text", cursor: "pointer"})}
                                     onClick={() => handleOnShow(row.id, row.pid, row.sid, row.idx)}>
                                    <Code onPointerEnterCapture={()=>{}} onPointerLeaveCapture={()=>{}}>{row.endpoint}</Code>
                                </Box>
                            )}
                        </Tooltip>
                    ),
                },
                {
                    key: row.name,
                    content: row.name
                },
                {
                    key: row.code,
                    content: row.code
                },
                {
                    key: 'MoreDropdown',
                    content: (
                        <DropdownMenu<HTMLButtonElement>
                            trigger={({triggerRef, ...props}) => (
                                <IconButton {...props} shape="circle" UNSAFE_size="small" icon={MoreIcon} label="more"
                                            ref={triggerRef}/>
                            )}
                            label={`More about ${row.name}`}>
                            <DropdownItemGroup>
                                <DropdownItem
                                    onClick={() => handleOnShow(row.id, row.pid, row.sid, row.idx)}>View</DropdownItem>
                                <DropdownItem
                                    onClick={() => handleOnEdit(row.id, row.pid, row.sid, row.idx)}>Edit</DropdownItem>
                                <DropdownItem
                                    onClick={() => handleOpenModalDelete(row)}>Delete</DropdownItem>
                            </DropdownItemGroup>
                        </DropdownMenu>
                    ),
                },

            ],
        }));


    return (
        <Layout
            title="Project Endpoints"
            isSideNavOpen={true}
            isAdmin={true}
            sidebarList={dataMocks}
            loadingSidebar={isLoadingMocks}
            renderAction={
                <ButtonGroup label="Content actions">
                    <Button appearance="primary" onClick={handleClickNew}>{t("create_new_endpoint")}</Button>
                </ButtonGroup>
            }
            renderBottomBar={
                <Inline space={"space.100"} shouldWrap>
                    <Box xcss={filterFlexItemStyle}>
                        <TextField
                            isCompact
                            onChange={onFilterQueryChange}
                            placeholder="Filter"
                            aria-label="Filter"
                            elemBeforeInput={
                                <Box xcss={xcss({marginLeft: 'space.100'})}>
                                    <SearchIcon size="small" label="search"/>
                                </Box>
                            }
                        />
                    </Box>
                    <Box xcss={filterFlexItemStyle}>
                        <Select
                            isClearable
                            spacing="compact"
                            options={statusActive}
                            placeholder="Status"
                            onChange={onFilterTypeChange}
                        />
                    </Box>

                </Inline>
            }>
            <ContentWrapper>
                <DynamicTable
                    emptyView={
                        <EmptyState
                            header="No Endpoint Yet"
                            description="Create new endpoint now!"
                            headingLevel={3}
                            imageUrl={"../assets/images/empty_x.svg"}
                        />
                    }
                    head={head}
                    rows={rows}
                    rowsPerPage={10}
                    defaultPage={1}
                    isLoading={isLoadingMocks}
                    loadingSpinnerSize="large"
                />
            </ContentWrapper>

            <ModalTransition>
                {isOpenAlertDelete && (
                    <Modal onClose={closeModalDelete}>
                        <ModalHeader>
                            <ModalTitle appearance="danger">
                                You’re about to delete this data
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Before you delete it permanently, there’s some things you should
                                know:
                            </p>
                            <ul>
                                <li>The data will be removed from your account</li>
                                <li>Cannot be restore the project</li>
                            </ul>
                        </ModalBody>
                        <ModalFooter>
                            <Button appearance="subtle" onClick={closeModalDelete}>Cancel</Button>
                            <Button appearance="danger" onClick={() => handleOnDelete()}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </ModalTransition>

        </Layout>
    );
};

export default Auth(ViewProject);
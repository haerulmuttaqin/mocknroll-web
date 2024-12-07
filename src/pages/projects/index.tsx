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
import {createKey, filterByValue} from "@utils/utils";
import EmptyState from "@atlaskit/empty-state";
import {showFlag} from "@store/actions/show-flag";
import {useDispatch} from "react-redux";
import Modal, {ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition,} from '@atlaskit/modal-dialog';
import Tooltip from "@atlaskit/tooltip";
import {OptionProps} from "@api/data/interfaces";
import {deleteBillingConfig, getBillingConfigs} from "@api/data/services/project";
import DropdownMenu, {DropdownItem, DropdownItemGroup} from "@atlaskit/dropdown-menu";
import MoreIcon from "@atlaskit/icon/glyph/more";
import {ProjectProps} from "@api/data/interfaces/project";
import Lozenge from "@atlaskit/lozenge";
import {filterFlexItemStyle} from "@styles/styles";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import Auth from "@protected/auth";

const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const Projects: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [billingConfigs, setBillingConfigs] = useState<ProjectProps[]>([])
    const [statusActive, setConfigTypes] = useState<OptionProps[]>([
        {value: 1, label: "Active"},
        {value: 0, label: "Inactive"},
    ])
    const [filterType, setFilterType] = useState<number>(1)
    const [filterQuery, setFilterQuery] = useState<string>("")
    const [shouldBeDelete, setShouldBeDelete] = useState<number>(-1)
    const [loading, setLoading] = useState<boolean>(true);
    const onFilterQueryChange = (e: any) => {
        setFilterQuery(e.target.value)
    }
    const [isOpenAlertDelete, setIsOpenAlertDelete] = useState(false);
    const openModalDelete = useCallback(() => setIsOpenAlertDelete(true), []);
    const closeModalDelete = useCallback(() => setIsOpenAlertDelete(false), []);

    const onFilterTypeChange = (option: any) => {
        setFilterType(option ? option.value : 1)
    }
    const getDataListBillingConfigs = async () => {
        setLoading(true)
        try {
            const {data} = await getBillingConfigs()
            setBillingConfigs(data?.data)
        } catch (err) {
            setLoading(false)
        } finally {
            setLoading(false)
        }
    };
    const doDelete = async (params: any) => {
        let errors = {}
        await deleteBillingConfig(params)
            .then((res: any) => {
                if (!res.success) {
                    closeModalDelete()
                    dispatch(
                        showFlag({
                            success: false,
                            title: "Delete Failed, Please try again.",
                            message: res.message
                        }) as any
                    );
                    if (res.errors) {
                        errors = res.errors
                    } else if (res.data) {
                        errors = res.data
                    } else {
                        errors = {}
                    }
                } else {
                    closeModalDelete()
                    setShouldBeDelete(-1)
                    getDataListBillingConfigs()
                    dispatch(
                        showFlag({
                            success: true,
                            title: "Successfully Deleted.",
                            message: "The billing config has been successfully deleted!",
                            goBack: false
                        }) as any
                    )
                }
            })
            .catch((err: any) => {
                closeModalDelete()
                dispatch(
                    showFlag({
                        success: false,
                        title: "Delete Failed, Please try again.",
                        message: err.message
                    }) as any
                );
            })
        return errors
    }
    const handleClickNew = () => {
        router.push("/projects/create")
    }
    const handleOnShow = (project_id: number) => {
        router.push(`/projects/${project_id}?action=edit`)
    }
    const handleOnEdit = (project_id: number) => {
        router.push(`/projects/${project_id}?action=edit`)
    }
    const handleOpenModalDelete = (project_id: number) => {
        setShouldBeDelete(project_id)
        openModalDelete()
    }
    const handleOnDelete = () => {
        doDelete(shouldBeDelete)
    }

    useEffect(() => {
        getDataListBillingConfigs()
    }, [])
    const head = {
        cells: [
            {
                key: 'name',
                content: 'Project Name',
                isSortable: true,
            },
            {
                key: 'key',
                content: 'Secret Key',
                isSortable: true,
            },
            {
                key: 'prefix',
                content: 'Prefix',
                isSortable: true,
            },
            {
                key: 'is_active',
                content: 'Status',
                isSortable: true,
            },
            {
                key: 'more',
                content: 'Actiom',
                shouldTruncate: true,
            },
        ],
    };

    const dataWithFilterQuery = (filterQuery == "" ? billingConfigs : filterByValue(billingConfigs, filterQuery))
    const dataWithFilterType = (filterType == 1 ? dataWithFilterQuery : dataWithFilterQuery.filter((filter: ProjectProps) => filter.is_active == filterType))
    const rows = dataWithFilterType?.map(
        (row: ProjectProps, index: number) => ({
            key: `row-${index}-${row.id}`,
            isHighlighted: false,
            cells: [
                {
                    key: createKey(row.name?.toString()),
                    content: (
                        <Tooltip content={row.name}>
                            {(tooltipProps) => (
                                <Box {...tooltipProps} xcss={xcss({color: "color.text", cursor: "pointer"})}
                                     onClick={() => handleOnShow(row.id)}>
                                    {row.name}
                                </Box>
                            )}
                        </Tooltip>
                    ),
                },
                {
                    key: row.key,
                    content: row.key
                },
                {
                    key: row.prefix,
                    content: row.prefix
                },
                {
                    key: row.is_active,
                    content: (
                        <Lozenge
                            appearance={row.is_active == 1 ? "success" : "removed"}>{row.is_active == 1 ? "active" : "inactive"}</Lozenge>
                    ),
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
                                <DropdownItem onClick={() => handleOnShow(row.id)}>View</DropdownItem>
                                <DropdownItem onClick={() => handleOnEdit(row.id)}>Edit</DropdownItem>
                                <DropdownItem
                                    onClick={() => handleOpenModalDelete(row.id)}>Delete</DropdownItem>
                            </DropdownItemGroup>
                        </DropdownMenu>
                    ),
                },

            ],
        }));


    return (
        <Layout
            title="Mock N' Roll Project"
            renderAction={
                <ButtonGroup label="Content actions">
                    <Button appearance="primary" onClick={handleClickNew}>New Billing Config</Button>
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
                            header="No Project Yet"
                            description="Create new project now!"
                            headingLevel={3}
                            imageUrl={"../assets/images/empty_x.svg"}
                        />
                    }
                    head={head}
                    rows={rows}
                    rowsPerPage={10}
                    defaultPage={1}
                    isLoading={loading}
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

export default Auth(Projects);
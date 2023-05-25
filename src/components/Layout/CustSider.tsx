// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
import React, { useState, useContext } from "react";
import Router from "next/router";
import { Layout, Menu, Button, Modal, message as msg } from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  DoubleLeftOutlined,
  PlusOutlined,
  LogoutOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
// API
import { archivedWorkspace } from "@/service/apis/workspace";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import CreateWorkSpaceModal from "@/components/Workspace/CreateWorkSpaceModal";
import MemberModal from "../Workspace/MemberModal";

interface IProps {
  s_collapsed: boolean;
  set_s_collapsed: ISetStateFunction<boolean>;
}

const CustSider: React.FC<IProps> = ({ s_collapsed, set_s_collapsed }) => {
  const { c_workspaces, c_getAllWorkspace, set_c_user } = useContext(GlobalContext);

  // 目前點選的 workspace
  const [s_workspace, set_s_workspace] = useState<Iworkspace>({
    workspaceId: "",
    workspaceName: "",
    kanbans: [],
    members: [],
    isArchived: false,
  });

  // 顯示新增 workspace 的開關
  const [s_isShowModal, set_s_isShowModal] = useState(false);

  // 顯示選擇 Member 的開關
  const [s_isShowMember, set_s_isShowMember] = useState(false);

  const archived = async (workspaceId: string) => {
    const res: AxiosResponse = await archivedWorkspace(workspaceId);
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
      c_getAllWorkspace();
    }
  };

  const handleLogout = async () => {
    msg.success("Log out success");
    Cookies.set("hookloop-token", "");
    set_c_user({
      username: "",
      email: "",
      password: "",
      avatar: "",
      userId: "",
    });
    Router.push("/");
  };

  // 用來存放要選染在 menu 的資料
  const menuItemX: MenuProps["items"] = c_workspaces?.map((workspace: Iworkspace) => {
    return {
      key: workspace.workspaceId,
      icon: <DesktopOutlined />,
      className: "workspace",
      label: <div className="">{workspace.workspaceName}</div>,
      // 看板區域
      children: [
        {
          label: <span className="kanbans">Kanbans</span>,
          key: `${workspace.workspaceId}Kanbans`,
          icon: <AppstoreOutlined />,
          // 這個 children 用來渲染 kanban
          children: workspace.kanbans.map((kanban) => ({
            key: workspace.workspaceName + kanban._id,
            onClick: () => Router.push(`/kanban/${kanban._id}`),
            label: kanban.name,
          })),
        },
        {
          label: <span className="members">Members</span>,
          key: `${workspace.workspaceId}members`,
          icon: <UserOutlined />,
          onClick: () => {
            set_s_isShowMember(true);
            set_s_workspace(workspace);
          },
        },
        {
          label: <span className="settings">Setting</span>,
          key: `${workspace.workspaceId}settings`,
          icon: <SettingOutlined />,
          children: [
            {
              key: `${workspace.workspaceId}Archive`,
              label: "Archive workspace",
              onClick: () => {
                Modal.confirm({
                  title: "Do you Want to Archive workspace?",
                  icon: <ExclamationCircleFilled />,
                  okButtonProps: {
                    className: "bg-[#262626] rounded-sm",
                  },
                  cancelButtonProps: {
                    className: "rounded-sm hover:border-[#262626] text-[#262626]",
                  },
                  onOk() {
                    archived(workspace.workspaceId);
                  },
                });
              },
            },
            {
              key: `${workspace.workspaceId}Kanban_setting`,
              label: "Workspace setting",
            },
          ],
        },
      ],
    };
  });

  return (
    <Layout.Sider
      trigger={null}
      width={235}
      collapsedWidth={0}
      className="border-r-[1px] transition-all duration-500 overflow-hidden"
      collapsible
      collapsed={s_collapsed}
    >
      {/* Home */}
      <section className="w-full py-5 px-7 text-[#595959] text-base">
        <HomeOutlined />
        <span className="font-medium ml-2">Home</span>
        <DoubleLeftOutlined className="float-right mt-1 cursor-pointer" onClick={() => set_s_collapsed(!s_collapsed)} />
      </section>

      {/* create workspace */}
      <section className=" w-full py-5 px-7 text-[#262626] bg-[#F5F5F5] text-base">
        <DesktopOutlined />
        <span className="font-medium ml-2">Workspace</span>
        <Button
          className="bg-[#FFA940] float-right text-white"
          type="primary"
          size="small"
          shape="circle"
          icon={<PlusOutlined style={{ verticalAlign: "middle" }} />}
          onClick={() => set_s_isShowModal(true)}
        />
      </section>

      {/* workspace 的 menu */}
      <Menu theme="light" mode="inline" selectable={false} items={menuItemX} />

      {/* logout */}
      <section
        role="presentation"
        className="w-full py-5 px-7 text-[#595959] text-base cursor-pointer hover:bg-[#F5F5F5]"
        onClick={handleLogout}
      >
        <LogoutOutlined />
        <span className="font-medium ml-2">Log out</span>
      </section>

      {/* 建立 workspace 的 Modal */}
      <Modal
        title="Create new workspace"
        width="572px"
        open={s_isShowModal}
        onCancel={() => set_s_isShowModal(false)}
        footer={null}
      >
        {s_isShowModal && <CreateWorkSpaceModal set_s_isShowModal={set_s_isShowModal} />}
      </Modal>

      {/* 選擇人員的 Modal */}
      <Modal
        title="Choose Member"
        width="572px"
        open={s_isShowMember}
        onCancel={() => set_s_isShowMember(false)}
        footer={null}
      >
        {s_isShowMember && (
          <MemberModal
            s_workspace={s_workspace}
            set_s_workspace={set_s_workspace}
            set_s_isShowMember={set_s_isShowMember}
          />
        )}
      </Modal>
    </Layout.Sider>
  );
};

export default CustSider;
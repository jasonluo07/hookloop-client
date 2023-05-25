import React, { useState } from "react";
import {
  BellFilled,
  BugOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  MessageOutlined,
  PlusOutlined,
  TagOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import user1 from "@/assets/user1.svg";
import user2 from "@/assets/user2.svg";
import user3 from "@/assets/user3.svg";
import user4 from "@/assets/user4.svg";
import user5 from "@/assets/user5.svg";
import fakeImage from "@/assets/fakeImage.svg";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { produce } from "immer";

const initialData: IData = {
  cards: {
    "card-1": {
      id: "card-1",
      title: "[P03] 新增 HTTPS 憑證",
      preview: null,
      priority: "Low",
      status: "Pending",
      tags: [
        { id: "p03", name: "P03" },
        { id: "bug", name: "bug" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
      reporter: { id: "user1", avatar: user1 },
      assignees: [
        { id: "user2", avatar: user2 },
        { id: "user3", avatar: user3 },
        { id: "user4", avatar: user4 },
        { id: "user5", avatar: user5 },
      ],
      dueDate: {
        type: "daterange",
        start: "03/17",
        end: "03/20",
      },
    },
    "card-2": {
      id: "card-2",
      title: "[P03] 更改模組名稱",
      preview: { src: fakeImage, filename: "fakeImage" },
      priority: "High",
      status: "Pending",
      tags: [
        { id: "p03", name: "P03" },
        { id: "bug", name: "bug" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
      reporter: { id: "user3", avatar: user3 },
      assignees: [
        { id: "user1", avatar: user1 },
        { id: "user2", avatar: user2 },
      ],
      dueDate: {
        type: "date",
        end: "03/04",
      },
    },
    "card-3": {
      id: "card-3",
      title: "[P02] 檔案對應錯誤",
      preview: null,
      priority: "Medium",
      status: "In Progress",
      tags: [
        { id: "p02", name: "P03" },
        { id: "bug", name: "bug" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
      reporter: { id: "user2", avatar: user2 },
      assignees: [
        { id: "user4", avatar: user4 },
        { id: "user3", avatar: user3 },
      ],
      dueDate: {
        type: "daterange",
        start: "03/17",
        end: "03/20",
      },
    },
    "card-4": {
      id: "card-4",
      title: "[P02] 選單新增<optgroup>",
      preview: {
        src: fakeImage,
        filename: "fakeImage",
      },
      priority: "High",
      status: "Done",
      tags: [
        { id: "p02", name: "P02" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
      reporter: { id: "user5", avatar: user5 },
      assignees: [
        { id: "user2", avatar: user2 },
        { id: "user3", avatar: user3 },
      ],
      dueDate: {
        type: "date",
        end: "02/22",
      },
    },
    "card-5": {
      id: "card-5",
      title: "[P02] 檔案對應錯誤",
      preview: {
        src: fakeImage,
        filename: "fakeImage",
      },
      priority: "Low",
      status: "Done",
      tags: [
        { id: "p02", name: "P02" },
        { id: "bug", name: "bug" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
      reporter: { id: "user2", avatar: user2 },
      assignees: [
        { id: "user4", avatar: user4 },
        { id: "user3", avatar: user3 },
      ],
      dueDate: {
        type: "date",
        end: "02/13",
      },
    },
    "card-6": {
      id: "card-6",
      title: "新增 Google Maps API",
      preview: null,
      priority: "Low",
      status: "Pending",
      tags: [
        { id: "p03", name: "P03" },
        { id: "new", name: "new" },
      ],
      reporter: { id: "user1", avatar: user1 },
      assignees: [],
      dueDate: {
        type: "date",
        end: "03/30",
      },
    },
    "card-7": {
      id: "card-7",
      title: "[P01] 新增待辦事項",
      preview: null,
      priority: null,
      status: null,
      tags: [],
      reporter: null,
      assignees: [],
      dueDate: null,
    },
  },
  lists: {
    "list-1": {
      id: "list-1",
      title: "Pending",
      cardOrder: ["card-1", "card-2"],
    },
    "list-2": {
      id: "list-2",
      title: "In Progress",
      cardOrder: ["card-3"],
    },
    "list-3": {
      id: "list-3",
      title: "Done",
      cardOrder: ["card-4", "card-5"],
    },
    "list-4": {
      id: "list-4",
      title: "Unknow",
      cardOrder: [],
    },
    "list-5": {
      id: "list-5",
      title: "Private",
      cardOrder: ["card-6"],
    },
    "list-6": {
      id: "list-6",
      title: "Private",
      cardOrder: ["card-7"],
    },
  },
  listOrder: ["list-1", "list-2", "list-3", "list-4", "list-5", "list-6"],
};

interface IList {
  id: string;
  title: string;
  cardOrder: string[];
}

interface IData {
  cards: { [key: string]: ICard };
  lists: { [key: string]: IList };
  listOrder: string[];
}

interface ICardProps {
  card: ICard;
  index: number;
}

interface IListProps {
  list: IList;
  cards: ICard[];
  index2: number;
}

const Card = (props: ICardProps) => {
  const { card, index } = props;

  return (
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {(provided2) => (
        <div
          id="first-card"
          className="py-4 px-3 bg-white cursor-pointer"
          key={card.id}
          ref={provided2.innerRef}
          {...provided2.draggableProps}
          {...provided2.dragHandleProps}
        >
          {/* 小鈴鐺 */}
          <div className="flex gap-2 text-base mb-3">
            <div className="flex items-center gap-1 text-[#FA541C]">
              <BellFilled />
              <span className="text-sm"> 3</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageOutlined />
              <span className="text-sm"> 3</span>
            </div>
          </div>
          {/* 標題 */}
          <div className="text-['Roboto'] font-bold text-base text-[#262626]">{card.title}</div>
          {(card.preview || card.priority || card.tags.length > 0 || card.reporter) && <div className="mt-4" />}
          {/* 預覽圖 */}
          {card.preview && <Image src={card.preview.src} alt={card.preview.filename} className="mb-4" />}
          {/* 優先度 */}
          {card.priority && (
            <div className="flex gap-2 mb-3">
              {card.priority === "High" && (
                <div className="py-0.5 px-2 bg-[#FFF1F0] border rounded border-[#CF1322]">
                  <div className="text-['Roboto'] font-medium text-[14px] leading-[22px] tracking-tight text-[#CF1322] whitespace-nowrap">
                    Priority:&nbsp;High
                  </div>
                </div>
              )}
              {card.priority === "Medium" && (
                <div className="py-0.5 px-2 bg-[#FFF7E6] border rounded border-[#D46B08]">
                  <div className="text-['Roboto'] font-medium text-[14px] leading-[22px] tracking-tight text-[#D46B08] whitespace-nowrap">
                    Priority:&nbsp;Medium
                  </div>
                </div>
              )}
              {card.priority === "Low" && (
                <div className="py-0.5 px-2 bg-[#F6FFED] border rounded border-[#389E0D]">
                  <div className="text-['Roboto'] font-medium text-[14px] leading-[22px] tracking-tight text-[#389E0D] whitespace-nowrap">
                    Priority:&nbsp;Low
                  </div>
                </div>
              )}
              <div className="py-0.5 px-2 bg-[#FAFAFA] border rounded border-[#BFBFBF]">
                <div className="text-['Roboto'] font-medium text-[14px] leading-[22px] tracking-tight text-[#595959] whitespace-nowrap">
                  Status:&nbsp;{card.status}
                </div>
              </div>
            </div>
          )}
          {/* 標籤 */}
          {card.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {card.tags.map((tag: { id: string; name: string }) => {
                if (tag.name === "bug") {
                  return (
                    <div className="bg-[#F5F5F5] py-0.5 px-3 rounded-[32px] flex gap-1 text-['Roboto']" key={tag.id}>
                      <BugOutlined className="text-[13px]" />
                      <span className="text-sm leading-[22px]">{tag.name}</span>
                    </div>
                  );
                }
                if (tag.name === "new") {
                  return (
                    <div className="bg-[#F5F5F5] py-0.5 px-3 rounded-[32px] flex gap-1 text-['Roboto']" key={tag.id}>
                      <ThunderboltOutlined className="text-[13px]" />
                      <span className="text-sm leading-[22px]">{tag.name}</span>
                    </div>
                  );
                }
                return (
                  <div className="bg-[#F5F5F5] py-0.5 px-3 rounded-[32px] flex gap-1 text-['Roboto']" key={tag.id}>
                    <TagOutlined className="text-[13px]" />
                    <span className="text-sm leading-[22px]">{tag.name}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex items-center justify-between">
            {/* 成員 */}
            {card.reporter && (
              <div className="flex space-x-[-12px]">
                <Image
                  src={card.reporter.avatar}
                  className="h-8 w-8 rounded-full z-40 outline outline-2 outline-[#FA8C16]"
                  alt="reporter"
                />
                {card.assignees.map((assignee: any, index2: number) => (
                  <Image
                    key={assignee.id}
                    src={assignee.avatar}
                    className="h-8 w-8 rounded-full border border-[#D9D9D9]"
                    style={{ zIndex: 30 - index2 * 10 }}
                    alt="assignee"
                  />
                ))}
              </div>
            )}
            {/* 時間 */}
            {card.dueDate && (
              <div className="flex gap-1 text-['Roboto'] text-[14px] leading-[22px] text-[#595959]">
                <ClockCircleOutlined />
                {card.dueDate.type === "daterange" && (
                  <span>
                    {card.dueDate.start} - {card.dueDate.end}
                  </span>
                )}
                {card.dueDate.type === "date" && <span>{card.dueDate.end}</span>}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

const AddCard = () => {
  return (
    <div id="add-card" className="cursor-pointer">
      <PlusOutlined />
      <span> Add a card</span>
    </div>
  );
};

const List = (props: IListProps) => {
  const { list, cards, index2 } = props;

  return (
    <Draggable draggableId={list.id} index={index2}>
      {(provided2) => (
        <div
          ref={provided2.innerRef}
          {...provided2.draggableProps}
          {...provided2.dragHandleProps}
          className="cursor-pointer"
        >
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                className="min-w-[330px] px-5 py-4 bg-[#F5F5F5]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* TODO: 可以將把手擴大 cursor-grab mx-[-20px] mt-[-16px] pt-[16px] px-[20px] */}
                <div className="flex justify-between items-center">
                  <span className="text-['Roboto'] font-medium text-xl text-[#262626]">{list.title}</span>
                  <EllipsisOutlined className="text-xl cursor-pointer" />
                </div>
                <div className="text-['Roboto'] font-medium text-sm text-[#8C8C8C] mb-2">
                  {cards.length} {cards.length === 1 ? "card" : "cards"}
                </div>
                {cards.length > 0 && (
                  <div className="flex flex-col space-y-6 mb-4">
                    {cards.map((card: ICard, index: number) => (
                      <Card key={card.id} card={card} index={index} />
                    ))}
                  </div>
                )}
                {provided.placeholder}
                <AddCard />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const AddList = () => {
  return (
    <div className="min-w-[330px] px-5 py-4 bg-[#F5F5F5]">
      <div className="text-['Roboto'] font-medium text-base text-[#595959] cursor-pointer">
        <PlusOutlined />
        <span> Add a list</span>
      </div>
    </div>
  );
};

const CustContent = () => {
  const [data, setData] = useState<IData>(initialData);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // 沒有任何移動
    if (!destination) {
      console.info("沒有任何移動");
      return;
    }

    // 移動到原本的位置
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      console.info("移動到原本的位置");
      return;
    }

    if (type === "card") {
      setData((prevData) =>
        produce(prevData, (draft) => {
          draft.lists[source.droppableId].cardOrder.splice(source.index, 1);
          draft.lists[destination.droppableId].cardOrder.splice(destination.index, 0, draggableId);
        }),
      );
    } else if (type === "list") {
      setData((prevData) =>
        produce(prevData, (draft) => {
          draft.listOrder.splice(source.index, 1);
          draft.listOrder.splice(destination.index, 0, draggableId);
        }),
      );
    }
  };

  // line 477 新增 mt-[64px] overflow-x-auto
  return (
    <section className="flex flex-col">
      <div className="w-full h-24 bg-yellow-500 flex justify-end">test</div>
      <section className="overflow-x-auto h-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div className="flex space-x-6 items-start" ref={provided.innerRef} {...provided.droppableProps}>
                {data.listOrder.map((listId: string, index2: number) => {
                  const list = data.lists[listId];
                  const cards = list.cardOrder.map((cardId: string) => data.cards[cardId]);
                  return <List key={list.id} list={list} cards={cards} index2={index2} />;
                })}
                {provided.placeholder}
                <AddList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </section>
  );
};

export default CustContent;
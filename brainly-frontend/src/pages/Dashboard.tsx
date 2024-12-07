import { useEffect, useState } from "react";

import "../App.css";
import Button from "../components/ui/Button";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/ui/Card";
import DeleteIcon from "../icons/DeleteIcon";
import CreateContentModal from "../components/ui/CreateContentModal";
import SideBar from "../components/ui/SideBar";
import { useContent } from "../hooks/useContent";
import YoutubeIcon from "../icons/YoutubeIcon";
import TwitterIcon from "../icons/TwitterIcon";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, getContent} = useContent();

  useEffect(() => {
    getContent()
  }, [modalOpen])

  return (
    <>
      <SideBar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            size="medium"
            text="Add Content"
            onClick={() => setModalOpen(true)}
            startIcon={<PlusIcon size="large" />}
          />
          <Button
            variant="secondary"
            size="medium"
            text="Share Brain"
            onClick={() => console.log("clicked")}
            startIcon={<ShareIcon size="large" />}
          />
        </div>

        <div className="flex gap-4 pt-4">
          {contents.map(({ title, type, link } : {
            title: string,
            type: "youtube" | "twitter",
            link: string
          }) => (
            <Card
              title={title}
              type={type}
              link={link}
              startIcon={type === "youtube" ? <YoutubeIcon /> : <TwitterIcon />}
              deleteIcon={<DeleteIcon size="large" />}
              shareIcon={<ShareIcon size="large" />}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

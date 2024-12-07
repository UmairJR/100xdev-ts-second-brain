import React from "react";

interface CardsProps {
  title: string;
  type: "youtube" | "twitter";
  link: string;
  startIcon: React.ReactElement;
  deleteIcon: React.ReactElement;
  shareIcon: React.ReactElement;
}

const Card = (props: CardsProps) => {
  return (
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-gray-500 pr-2">{props.startIcon}</div>
          <div className="font-semibold text-gray-900 pr-2">{props.title}</div>
        </div>
        <div className="flex items-center">
          <div className="text-gray-500 pr-2">{props.shareIcon}</div>
          <div className="text-gray-500">{props.deleteIcon}</div>
        </div>
      </div>
      <div className="pt-4">
        {props.type === "youtube" && (
          <iframe
            className="w-full"
            src={props.link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {props.type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Card;

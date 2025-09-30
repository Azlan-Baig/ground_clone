'use client'
import { PortableText, PortableTextBlock } from "next-sanity";
import Image from "next/image";
import React, { useState } from "react";
import ReactModal from "react-modal";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


interface TeamMember {
  title: string;
  image: string;
  designation: string;
  content: PortableTextBlock[];
}
interface Team {
  icon: string;
  name: string;
  title: string;
  teamMembers: TeamMember[];
  isContentRight: boolean | null;
}

interface LeadershipTeamProps {
  data: {
    title: string;
    teams: Team[];
    _type: string;
  };
}

const LeadershipTeam = ({ data }: LeadershipTeamProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember>()

  const openModal = (item: any) => {
    setSelectedMember(item)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    
    setModalIsOpen(false);
  };
  return (
    <>
      <div className="leadership-team-wrapper">
        <div className="leadership__team" id={data?._type}>
          <div className="title__wrapper title--pattern">
            <div className="wrapper">
              <h3 className="titles title--50 clr--brand animate animate-up">
                {data?.title}
              </h3>
            </div>
          </div>

          {data?.teams.length > 0 &&
            data?.teams?.map((team, index) => {
              return (
                <div key={index} className="slider__wrapper" >
                  <div className="title__wrapper wrapper">
                    <h4 className="animate animate-up animate-delay-150">
                      {team?.title}
                    </h4>
                  </div>
                  <div className="wrapper wrapper--overflow--mob">
                    <div className="swiper card__slider director--slider">
                      <div className="swiper-wrapper">
                        {team &&
                          team?.teamMembers &&
                          team?.teamMembers?.map((member) => (
                            <div
                              className="swiper-slide slider--item"
                              key={member.title}
                              onClick={() => openModal(member)}
                            >
                              <figure className="animate animate-in-inline">
                                <picture className="custom--cursor">
                                  <Image
                                    src={member.image}
                                    alt={member.title}
                                    width={600}
                                    height={600}
                                    className="fluid"
                                    loading="lazy"
                                  />
                                </picture>
                                <figcaption>
                                  <div className="content">
                                    <p>{member.title}</p>
                                    <span>{member.designation}</span>
                                  </div>
                                  <span className="modal__link d__flex flex--center">
                                    <svg
                                      fill="none"
                                      width="15"
                                      height="12"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 16 13"
                                    >
                                      <path
                                        d="M6.7 12a.8.8 0 0 0 .8.8H15a.8.8 0 0 0 0-1.6H7.5a.8.8 0 0 0-.8.8ZM.2 6.5a.8.8 0 0 0 .8.8h14a.8.8 0 0 0 0-1.6H1a.8.8 0 0 0-.8.8ZM.2 1a.8.8 0 0 0 .8.8h14a.8.8 0 0 0 0-1.6H1a.8.8 0 0 0-.8.8Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>
                                  <a
                                    href={`#director-${member.title}`}
                                    className="modal--open--link"
                                    data-vbtype="inline"
                                    data-maxwidth="1000px"
                                  ></a>
                                </figcaption>
                              </figure>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="wrapper">
                    <div className="swiper__controls">
                      <div className="progress">
                        <div className={`swiper-scrollbar director--scrollbar-${index} swiper-scrollbar-horizontal`} />
                      </div>
                      <div className="swiper__btn__wrapper d__flex">
                        <div className={`swiper-button-prev director--prev-${index}`}>
                          <svg
                            width="29"
                            height="19"
                            viewBox="0 0 29 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              y1="-0.5"
                              x2="28"
                              y2="-0.5"
                              transform="matrix(-1 0 0 1 29 10)"
                              stroke="#001081"
                            />
                            <path
                              d="M9.34924 18.0946L0.698486 9.44385L9.34924 0.793091"
                              stroke="#001081"
                            />
                          </svg>
                        </div>
                        <div className={`swiper-button-next director--next-${index}`}>
                          <svg
                            width="30"
                            height="19"
                            viewBox="0 0 30 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              y1="9.25"
                              x2="28"
                              y2="9.25"
                              stroke="#001081"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M19.6508 18.0946L28.3015 9.44385L19.6508 0.793091"
                              stroke="#001081"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

         
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="teams Modal"
        className="teams-modal"
        overlayClassName="teams-modal-overlay modal-overlay backdrop-modal-overlay"
      >
          <div onClick={closeModal} className="btn-subs-cross teams-btn-cross">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.73564 21.3965L0.603455 19.2644L9.13219 10.7356L0.603455 2.20689L2.73564 0.074707L11.2644 8.60344L19.7931 0.074707L21.9253 2.20689L13.3966 10.7356L21.9253 19.2644L19.7931 21.3965L11.2644 12.8678L2.73564 21.3965Z" fill="#F2F4FC"/>
            </svg>
          </div>
          <div className="teams-wrapper">
            <div className="team-p">
              <h2 className="title--50">{selectedMember?.title}</h2>
              <p className="teams-designation">{selectedMember?.designation}</p>
            </div>
            <SimpleBar className="teams-richText-wrapper" forceVisible="y" autoHide={false}>
              <div >
              <PortableText value={selectedMember?.content || []}  />
              </div>

            </SimpleBar>
          </div>
      </ReactModal>
    </>
  );
};

export default LeadershipTeam;

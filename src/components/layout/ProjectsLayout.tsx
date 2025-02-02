import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Avatar, Button, IconButton, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PublicIcon from '@mui/icons-material/Public';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';

import { IProjectState } from '@/types/project';
import { DeterminateSize } from '../types/enum';

import ProjectTabs from '../pages/projects/ProjectTabs';
import CircularDeterminate from '../block/circularDeterminate';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import { formatDateWithTime } from '@/libraries/utils';
import { projectCategoryEnum } from '@/libraries/enum';

interface IProjectLayoutProps {
  projectState: IProjectState;
  children: ReactNode;
  handleFollow?: Function;
  followed?: boolean;
  tabIndex?: number;
}

const ProjectsLayout: React.FC<IProjectLayoutProps> = ({
  children,
  projectState,
  handleFollow,
  followed,
  tabIndex,
}) => {
  const {
    _id,
    projectType,
    projectForm,
    projectStatus,
    projectCategory,
    projectName,
    projectImage,
    projectDescription,
    goalAmount,
    currentAmount,
    currentAmountPercentage,
    startTime,
    endTime,
    officialPage,
    fanPage,
    attachmentLink,
    projectContent,
    projectTeam,
    projectProposer,
    projectFollowers,
    projectBackers,
    createdAt,
    updatedAt,
  } = projectState;
  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();
  const router = useRouter();

  const [remainingTime, setRemainingTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (endTime) {
      const timer = setInterval(() => {
        setRemainingTime(getRemainingTime(new Date(endTime)));
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [endTime]);

  function getRemainingTime(endT: Date) {
    const now = new Date();
    const timeDiff = Math.max(endT.getTime() - now.getTime(), 0);

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  const handleProjectClick = (projectId: string, projectPlanId?: string) => {
    router.push(`/projects/select/${projectId}`);
  };

  return (
    <div>
      <div className="project bg-gray-light">
        <div className="max-w-screen-xl mx-auto px-10">
          <div className="project-category py-5">
            <Typography component="span" variant="h6">
              Home
            </Typography>
            <Typography component="span" variant="h6" className="px-3">
              \
            </Typography>
            <Typography component="span" variant="h6">
              募資專案
            </Typography>
            <Typography component="span" variant="h6" className="px-3">
              \
            </Typography>
            <Typography component="span" variant="h6" className="text-primary">
              {projectCategoryEnum[projectCategory as keyof typeof projectCategoryEnum]}
            </Typography>
          </div>
          <div className="project-main py-8">
            <Typography component="h2" variant="h2">
              {projectName}
            </Typography>
            <div className="details w-full flex justify-center pt-8 gap-6">
              <div className="flex flex-col w-2/3 relative ">
                <Image
                  src={projectImage || '/project/Desktop_Project_kv.png'}
                  alt="project1"
                  priority={true}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  // // style={{ objectFit: 'contain' }}
                  // width={400}
                  // height={300}
                  // style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div className="w-1/3 flex flex-col justify-between">
                <div className="project-action bg-white h-[70%] rounded-lg p-6">
                  <div className="project-progress flex items-center pb-5 border-0 border-b border-solid border-secondary-10">
                    <CircularDeterminate
                      value={currentAmountPercentage || 0}
                      size={'108px'}
                      textSize={DeterminateSize.Medium}
                    />
                    <div className="progress-text ml-5">
                      <Typography component="h3" variant="h3" className="mb-2">
                        NT${currentAmount}
                      </Typography>
                      <Typography component="span" variant="h6" className="mr-2">
                        目標
                      </Typography>
                      <Typography component="span" variant="h6" className="text-primary">
                        NT${goalAmount}
                      </Typography>
                    </div>
                  </div>
                  <div className="project-details mt-4 flex">
                    <div className="support mr-8">
                      <Typography component="p" variant="caption" className="text-secondary-66 mb-1">
                        專案支持
                      </Typography>
                      <Typography component="span" variant="h4" className="text-primary mr-1">
                        {projectBackers}
                      </Typography>
                      <Typography component="span" variant="caption" className="text-secondary">
                        人
                      </Typography>
                    </div>
                    <div className="remaining-time">
                      <Typography component="p" variant="caption" className="text-secondary-66 mb-1">
                        剩餘時間
                      </Typography>
                      <Typography component="span" variant="h4" className="text-primary mr-1">
                        {remainingTime?.days}
                      </Typography>
                      <Typography component="span" variant="caption" className="text-secondary mr-2">
                        天
                      </Typography>
                      <Typography component="span" variant="h4" className="text-primary mr-1">
                        {remainingTime?.hours}
                      </Typography>
                      <Typography component="span" variant="caption" className="text-secondary mr-2">
                        時
                      </Typography>
                      <Typography component="span" variant="h4" className="text-primary mr-1">
                        {remainingTime?.minutes}
                      </Typography>
                      <Typography component="span" variant="caption" className="text-secondary mr-2">
                        分
                      </Typography>
                      <Typography component="span" variant="h4" className="text-primary mr-1">
                        {remainingTime?.seconds}
                      </Typography>
                      <Typography component="span" variant="caption" className="text-secondary mr-2">
                        秒
                      </Typography>
                    </div>
                  </div>
                  <div className="project-time mt-4">
                    <Typography component="p" variant="caption" className="text-secondary-66 mb-1">
                      專案時間
                    </Typography>
                    <Typography component="p" variant="h6" className="text-secondary">
                      {`${formatDateWithTime(String(startTime))} - ${formatDateWithTime(String(endTime))}`}
                    </Typography>
                  </div>
                  <div className="project-btns mt-3">
                    <div className="btn-support">
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={() => handleProjectClick(_id as string)}
                      >
                        贊助專案
                      </Button>
                    </div>
                    <div className="btns-action flex justify-center gap-3 mt-3">
                      <div className="btn1 w-1/2 flex">
                        <Button
                          onClick={() => {
                            console.log(handleFollow);
                            handleFollow && handleFollow();
                          }}
                          variant="outlined"
                          fullWidth
                          color="secondary"
                          startIcon={followed ? <CheckIcon /> : <AddRoundedIcon />}
                          className="flex justify-center items-center"
                        >
                          {followed ? '已追蹤' : '追蹤專案'}
                        </Button>
                      </div>
                      <div className="btn2 w-1/2">
                        <Button variant="outlined" fullWidth color="secondary" startIcon={<ShareIcon />}>
                          分享
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-team bg-white h-[28%] rounded-lg p-6 flex flex-col justify-between">
                  <div className="corporation flex items-center space-x-5 pb-3 mb-2 border-0 border-b border-solid border-secondary-10">
                    <Avatar className="w-[72px] h-[72px]" alt="teamName" src={projectTeam?.teamAvatar || ''}></Avatar>
                    <Link
                      href={`${projectTeam?.socialWebsite || 'https://www.facebook.com/mujibu'}`}
                      className="text-xl no-underline visited:text-primary text-primary font-medium "
                    >
                      {`${
                        projectTeam?.companyName || projectTeam?.teamName || 'LiteConnect Inc 輕連結有限公司(default)'
                      }`}
                    </Link>
                  </div>
                  <div className="socials flex justify-between items-center">
                    <div className="socials-text">
                      <Typography component="span" variant="caption" className="text-secondary-66">
                        {/* dead */}
                        已發起 1 個專案
                      </Typography>
                    </div>
                    <div className="socials-btns">
                      <IconButton
                        aria-label="homepage"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          window.open(`${projectTeam?.socialFb || 'https://www.facebook.com/mujibu'}`, '_ blank')
                        }
                      >
                        <PublicIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="email"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          window.open(`${projectTeam?.socialEmail || 'https://www.facebook.com/mujibu'}`, '_ blank')
                        }
                      >
                        <MailOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="facebook"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          window.open(`${projectTeam?.socialFb || 'https://www.facebook.com/mujibu'}`, '_ blank')
                        }
                      >
                        <FacebookIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="youtube"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          window.open(`${projectTeam?.socialYoutube || 'https://www.facebook.com/mujibu'}`, '_ blank')
                        }
                      >
                        <YouTubeIcon fontSize="small" />
                      </IconButton>
                      {/* <IconButton aria-label="instagram" color="secondary" size="small">
                        <InstagramIcon fontSize="small" />
                      </IconButton> */}
                      <IconButton
                        aria-label="line"
                        color="secondary"
                        size="small"
                        onClick={() =>
                          window.open(`${projectTeam?.socialLine || 'https://www.facebook.com/mujibu'}`, '_ blank')
                        }
                      >
                        <svg width="20" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M13.75 8.49023C13.75 8.39648 13.6562 8.30273 13.5625 8.34961H13.0469C12.9531 8.34961 12.9062 8.39648 12.9062 8.49023V10.459L11.3594 8.39648C11.3594 8.34961 11.3125 8.34961 11.2656 8.34961H10.7031C10.6094 8.34961 10.5625 8.39648 10.5625 8.49023V11.8184C10.5625 11.9121 10.6094 11.959 10.7031 11.959H11.2656C11.3125 11.959 11.4062 11.9121 11.4062 11.8184V9.84961L12.9062 11.9121C12.9531 11.9121 13 11.959 13.0469 11.959H13.5625C13.6562 11.959 13.75 11.9121 13.75 11.8184V8.49023ZM9.90625 8.30273H9.34375C9.25 8.30273 9.20312 8.39648 9.20312 8.49023V11.8184C9.20312 11.9121 9.25 11.959 9.34375 11.959H9.90625C9.95312 11.959 10.0469 11.9121 10.0469 11.8184V8.49023C10.0469 8.39648 9.95312 8.30273 9.90625 8.30273ZM8.59375 11.1152H7.14062V8.49023C7.14062 8.39648 7.09375 8.30273 7 8.30273H6.4375C6.39062 8.30273 6.29688 8.39648 6.29688 8.49023V11.8184C6.29688 11.8652 6.34375 11.8652 6.34375 11.9121C6.39062 11.9121 6.39062 11.959 6.4375 11.959H8.59375C8.6875 11.959 8.73438 11.8652 8.73438 11.8184V11.2559C8.73438 11.209 8.6875 11.1152 8.59375 11.1152ZM16.5625 8.30273H14.4062C14.3125 8.30273 14.2656 8.39648 14.2656 8.49023V11.8184C14.2656 11.8652 14.3125 11.959 14.4062 11.959H16.5625C16.6094 11.959 16.7031 11.9121 16.7031 11.8184V11.2559C16.7031 11.209 16.6094 11.1152 16.5625 11.1152H15.1094V10.5527H16.5625C16.6094 10.5527 16.7031 10.5059 16.7031 10.4121V9.84961C16.7031 9.80273 16.6094 9.70898 16.5625 9.70898H15.1094V9.14648H16.5625C16.6094 9.14648 16.7031 9.09961 16.7031 9.00586V8.49023C16.7031 8.39648 16.6094 8.30273 16.5625 8.30273ZM22 4.22461C22 2.11523 20.2656 0.427734 18.2031 0.380859H4.79688C2.6875 0.380859 1 2.11523 1 4.17773V17.584C0.953125 19.6934 2.6875 21.3809 4.79688 21.3809H18.1562C20.2656 21.4277 21.9531 19.6934 22 17.584V4.22461ZM19.0938 9.99023C19.0938 11.3496 18.5781 12.5684 17.4531 13.7871C15.8594 15.6621 12.25 17.9121 11.4531 18.2402C10.6094 18.5684 10.75 18.0059 10.7969 17.8184C10.9844 16.5996 11.0781 16.2715 10.1875 16.084C6.53125 15.6152 3.8125 13.0371 3.8125 9.99023C3.8125 6.56836 7.23438 3.75586 11.4531 3.75586C15.6719 3.75586 19.0938 6.56836 19.0938 9.99023Z"
                            fill="currentColor"
                          />
                        </svg>
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-10 py-8">
        <ProjectTabs projectId={_id} tabIndex={tabIndex} />
        {children}
      </div>
    </div>
  );
};

export default ProjectsLayout;

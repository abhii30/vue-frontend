import { HomeView, TestView } from '@/views'
import {
  JobsView,
  JobOverView,
  CreateJobOverView,
  CreateJobView1,
  CreateJobView2,
  CreateJobView3,
  CreateJobView4,
  CreateJobView5,
  EditJobView1,
  EditJobView2,
  EditJobView3,
  EditJobView4,
  EditJobView5,
  ApplicantsView,
  ProfileOverView,
  EditProfileOverView,
  ProfileSocial,
  EditProfileSocial,
  ProfileAbout,
  EditProfileAbout,
  ProfileCustomise,
  ProfileAccessManagement,
  EditProfileAccessManagement,
  BatchUpload,
  Funnel,
  // FunnelAssessmentView,
  FunnelSeekerProfileView,
  FunnelSeekerDomainView,
  FunnelSeekerScrenningView,
  FunnelSeekerTypingView,
  FunnelSeekerVideoView,
  FunnelSeekerVoiceView,
} from '@/views/Employer'
export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  {
    path: '/employer',
    name: 'employer',
    redirect: 'employer/jobs',
    children: [
      {
        path: 'jobs',
        name: 'employerJobs',
        component: JobsView,
        children: [
          {
            path: 'create',
            name: 'employerCreateJob',
            redirect: {
              name: 'employerCreateJob-1'
            },
            children: [
              {
                path: 'overview',
                name: 'employerCreateJobOverView',
                component: CreateJobOverView,
                props: true
              },
              {
                path: '1',
                name: 'employerCreateJob-1',
                component: CreateJobView1,
                props: true
              },
              {
                path: '2',
                name: 'employerCreateJob-2',
                component: CreateJobView2,
                props: true
              },
              {
                path: '3',
                name: 'employerCreateJob-3',
                component: CreateJobView3,
                props: true
              },
              {
                path: '4',
                name: 'employerCreateJob-4',
                component: CreateJobView4,
                props: true
              },
              {
                path: '5',
                name: 'employerCreateJob-5',
                component: CreateJobView5,
                props: true
              }
            ]
          },
          {
            path: ':id/edit',
            name: 'employerEditJob',
            redirect: {
              name: 'employerEditJob-1'
            },
            props: true,
            children: [
              {
                path: '1',
                name: 'employerEditJob-1',
                component: EditJobView1,
                props: true
              },
              {
                path: '2',
                name: 'employerEditJob-2',
                component: EditJobView2,
                props: true
              },
              {
                path: '3',
                name: 'employerEditJob-3',
                component: EditJobView3,
                props: true
              },
              {
                path: '4',
                name: 'employerEditJob-4',
                component: EditJobView4,
                props: true
              },
              {
                path: '5',
                name: 'employerEditJob-5',
                component: EditJobView5,
                props: true
              }
            ]
          },
          {
            path: ':id/overview',
            name: 'employerJobOverView',
            component: JobOverView,
            props: true
          }
        ]
      },

      {
        path: 'applicants',
        name: 'employerApplicants',
        component: ApplicantsView
      },
      {
        path: 'profile',
        name: 'employerProfile',
        redirect: {
          name: 'employerProfileOverview'
        },
        children: [
          {
            path: 'overview',
            name: 'employerProfileOverview',
            component: ProfileOverView
          },
          {
            path: 'overview/edit',
            name: 'editEmployerProfileOverview',
            component: EditProfileOverView
          },
          {
            path: 'customise',
            name: 'employerProfileCustomise',
            component: ProfileCustomise
          },
          {
            path: 'about',
            name: 'employerProfileAbout',
            component: ProfileAbout
          },
          {
            path: 'about/edit',
            name: 'editEmployerProfileAbout',
            component: EditProfileAbout
          },
          {
            path: 'access-management',
            name: 'employerProfileAccessManagement',
            component: ProfileAccessManagement
          },
          {
            path: 'access-management/edit',
            name: 'editEmployerProfileAccessManagement',
            component: EditProfileAccessManagement
          },
          {
            path: 'social',
            name: 'employerProfileSocial',
            component: ProfileSocial
          },
          {
            path: 'social/edit',
            name: 'editEmployerProfileSocial',
            component: EditProfileSocial
          }
        ]
      },
      {
        path: 'batchupload',
        name: 'employerBatchUpload',
        component: BatchUpload
      },
      {
        path: 'funnel',
        name: 'employerFunnel',
        component: Funnel,
        children: [
          {
            path: 'jobseeker',
            name: 'employerFunnelSeeker',
            redirect: {
              name: 'employerFunnelSeekerVoice'
            },
            // props:true,
            children:[
             { 
              path: 'profile',
              name: 'employerFunnelSeekerProfile',
              component: FunnelSeekerProfileView,
              // props:true
             },
             { 
              path: 'screnning',
              name: 'employerFunnelSeekerScrenning',
              component: FunnelSeekerScrenningView
             },
             { 
              path: 'domain',
              name: 'employerFunnelSeekerDomain',
              component: FunnelSeekerDomainView
             },
             { 
              path: 'typing',
              name: 'employerFunnelSeekerTyping',
              component: FunnelSeekerTypingView
             },
             { 
              path: 'voice',
              name: 'employerFunnelSeekerVoice',
              component: FunnelSeekerVoiceView
             },
             { 
              path: 'video',
              name: 'employerFunnelSeekerVideo',
              component: FunnelSeekerVideoView
             },

            ]
          }
        ]
      }
    ]
  }
]

import{b as h,n as y,e as T,u as M,r as P,g as C,j as a,K as x,M as m,Q as p}from"./index-CI7g5s02.js";import{u as D}from"./useMutation-CLjOYzK4.js";import{E as S}from"./ellipsis-vertical-DrPhESdI.js";import{L as $}from"./loader-circle-DeqSpYPf.js";function L(t){t=Math.floor(t);const n=Math.floor(t/3600),e=Math.floor(t%3600/60),i=t%60;return`${n.toString().padStart(2,"0")}:${e.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`}const V=t=>t.length>25?t.substring(0,25)+". . . . .":t,A=t=>{const n=new Date(t),e=Date.now()-n;if(e>864e5)return Math.floor(e/864e5)+" days ago";if(e>36e5)return Math.floor(e/36e5)+" hours ago";if(e>6e4)return Math.floor(e/6e4)+" mins ago";if(e>1e3)return Math.floor(e/1e3)+" seconds ago"},_=()=>{const t=new Date,{toast:n}=h(),e=y(),c=D({mutationFn:async({videoId:s,playlistId:d})=>{const l=await T.post(`/api/v1/video-play-list/new-video/${s}/${d}`);return l==null?void 0:l.data},onSuccess:()=>{e.invalidateQueries({queryKey:["fetchPlaylistVideos"]}),n({title:"Video added successfully . . . . . . . .",description:`At : ${t.toLocaleDateString()}`,variant:"default"})},onError:s=>{n({title:"Somthing went wrong . . . . . .!",description:s==null?void 0:s.message,variant:"destructive"})}});return{addToPlayList:c.mutate,addToPlaylistLoading:c.isPending}},Q=({video:t={},userId:n=t.owner,avatar:e="",username:i="",dropMenuBar:c=[],playlist:s=[],titleSize:d="14px",fontSize:l="12px"})=>{var g;const{toast:b}=h(),{addToPlayList:w,addToPlaylistLoading:j}=_(),u=M(),k=y(),f=P.useCallback(()=>{C().userId?(u(`/signin/play-video/${t==null?void 0:t._id}`),k.invalidateQueries({queryKey:["watchHistoryVideos"]})):(b({title:"Please signin to watchvideos",description:"if you signin then you will be authenticated to all the pages and Routes so Please sign-in and Enjoy . . . . !",duration:4e3}),console.log("from Here"),u("/signin"))},[]);return a.jsxs("div",{className:"",children:[a.jsxs("div",{className:"relative",children:[a.jsx("video",{onClick:()=>f(),className:"w-full object-cover rounded-xl z-20 scroll-none overflow-hidden",poster:t==null?void 0:t.thumbnail,src:t==null?void 0:t.videoFile}),a.jsx("div",{className:"absolute bg-black bottom-0 rounded-[6px] text-[12px] p-1 right-0 text-white",children:L(t==null?void 0:t.duration)})]}),a.jsxs(x,{children:[a.jsx(m,{className:"text-gray-900 dark:text-white absolute right-2 bottom-[5%] z-10",children:a.jsx(S,{className:"outline-none"})}),a.jsxs(p,{className:"text-gray-900 dark:text-white text-[13px] grid space-y-1 border-gray-500 dark:border-slate-600 bg-opacity-50 cursor-pointer rounded-[7px] bg-gray-100 dark:bg-black text-center w-fit mr-8 px-0 py-1",children:[c.map((r,N)=>a.jsx("div",{className:"px-2 py-1 m-1 grid place-items-center rounded-[9px] transition-all pb-2 hover:bg-gray-500 dark:hover:bg-slate-800 dark:text-slate-400",onClick:r==null?void 0:r.operation,children:(r==null?void 0:r.name)!=="Add-video To playlist"?r==null?void 0:r.name:a.jsxs(x,{children:[a.jsx(m,{className:" text-slate-800 dark:text-slate-200",children:"Add-video To playlist"}),a.jsx(p,{className:"text-gray-900 dark:text-white text-[13px] grid space-y-1 border-gray-500 dark:border-slate-600 bg-opacity-50 cursor-pointer place-content-center rounded-[7px] bg-gray-100 dark:bg-black text-center w-fit px-0 py-1 mr-44",children:s==null?void 0:s.map(o=>a.jsx("div",{onClick:()=>w({videoId:t==null?void 0:t._id,playlistId:o._id}),children:j?a.jsx($,{className:"animate-spin"}):o==null?void 0:o.title},o._id))})]})},N)),a.jsx("a",{href:t==null?void 0:t.videoFile,className:"px-2 py-1 m-1 grid place-items-center rounded-[9px] transition-all pb-2 hover:bg-gray-500 dark:hover:bg-slate-800 dark:text-slate-400",target:"_blank",rel:"noopener noreferrer",type:"download",children:"Download"})]})]}),a.jsxs("div",{className:"flex items-center gap-1 w-full overflow-scroll mt-2 relative",children:[a.jsx("img",{onClick:()=>{var r;return u(`/signin/user-profile/${n||((r=t==null?void 0:t.owner)==null?void 0:r._id)}`)},src:e??((g=t==null?void 0:t.owner)==null?void 0:g.avatar)??"https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg",className:"size-8 rounded-full border-2 border-white"}),a.jsxs("div",{className:"grid gap-1",children:[a.jsx("p",{className:`text-gray-700 dark:text-white ml-2 overflow-hidden text-[${d}]`,children:t!=null&&t.title?V(t==null?void 0:t.title):""}),a.jsxs("div",{className:`flex gap-3 ml-2 text-[${l}]`,children:[a.jsx("p",{className:"text-gray-500 dark:text-slate-600 ",children:i}),a.jsxs("p",{className:"text-gray-500 dark:text-slate-600 ",children:["views ",t==null?void 0:t.views]}),a.jsx("p",{className:"text-gray-500 dark:text-slate-600 ",children:A(t==null?void 0:t.createdAt)})]})]})]})]})};export{Q as V,A as c};

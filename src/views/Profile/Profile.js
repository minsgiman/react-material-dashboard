import React from 'react';
import projects from './projects';

const Profile = () => {
  function createMarkup(html) {
    return { __html: html };
  }

  return (
    <div className="markdown_root profile_wrap">
      {/*
      <section>
          <h4 className="section_tit">Career</h4>
          <div className="contents">
              <h4>
                NHN
                <span className="period">(2017.03 ~ Current)</span>
              </h4>
              - Develop web frontend and nodejs, redis, webrtc server
              <br/>
              <br/>
              <h4>
                Humax
                <span className="period">(2012.01 ~ 2017.03)</span>
              </h4>
              - Develop web frontend
          </div>
        </section>
        */}
      <section>
        <h4 className="section_tit">Skills</h4>
        <div className="contents">
          <h4>Frontend</h4>
          <span className="sub_tit">- Language :</span>
          Javascript, Typescript, HTML, CSS, Less, Sass
          <br />
          <span className="sub_tit">- Framework & Library :</span>
          Vue, React, AngularJS, Jquery, D3, Storybook, Jest, Enzyme, Jasmine,
          Karma
          <br />
          <br />
          <h4>Backend</h4>- NodeJS, Redis, Nginx, WebRTC, MongoDB, Clustering
        </div>
      </section>
      <section>
        <h4 className="section_tit">Projects</h4>
        <div className="contents">
          <ul className="project_list">
            {projects.map((project, index) => {
              return (
                <li key={index}>
                  <h4>{project.title}</h4>
                  <p
                    className="description"
                    dangerouslySetInnerHTML={createMarkup(
                      project.description
                    )}></p>
                  <p className="tech_wrap">
                    <span className="sub_tit">사용기술 : </span>
                    <span
                      dangerouslySetInnerHTML={createMarkup(
                        project.skill
                      )}></span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Profile;

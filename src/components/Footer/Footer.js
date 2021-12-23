import { Button, Toolbar } from "@material-ui/core";

import myHoc from "../../hoc/myHoc";

function Footer(props) {
  console.log(props);
  return (
    <Toolbar className="footer">
      <div>
        <p>Auther : Mege Refsnes</p>
        <p>
          <a href="exapmle.com">exaple.com</a>
        </p>
        <Button onClick={props.doSomething}>myHoc</Button>
      </div>
      <style jsx="true">
        {`
          .footer {
            background: var(--theme-background);
            position: fixed;
            bottom: 0;
            width: 100%;
            padding: 0;
          }
          .footer div {
            width: inherit;
            text-align: center;
          }
          .footer div p {
            margin: 0;
            color: #fff;
          }
          .footer div p a:link {
            margin: 0;
            color: #fff;
          }
        `}
      </style>
    </Toolbar>
  );
}

export default myHoc(Footer);

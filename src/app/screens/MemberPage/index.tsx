// React Import
import { useMemo } from "react";
// React Router Imports
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
// Local Component Imports
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";
// CSS Import
import "../../../css/my_page.css";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage(props: any) {
  const { verifiedMemberData } = props;
  let member = useRouteMatch();
  console.log("member", member);

  const query = useQuery(),
    chosen_mb_id: string | null = query.get("mb_id") ?? null,
    chosen_art_id: string | null = query.get("art_id") ?? null;

  console.log("QUERY TEST:::", query.get("mb_id"));
  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage
            verifiedMemberData={verifiedMemberData}
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage verifiedMemberData={verifiedMemberData} />
        </Route>
      </Switch>
    </div>
  );
}

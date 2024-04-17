import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {

  const open = await prisma.issue.count({
    where:{ status: 'OPEN'}
  })
  const inProgress = await prisma.issue.count({
    where:{ status: 'IN_PROGRESS'}
  })
  const closed = await prisma.issue.count({
    where:{ status: 'CLOSED'}
  })

 
  return (
    <Grid columns={{ initial: "1", md: "2"}} gap="4">
      <Flex direction="column">
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
      <IssueChart open={open} inProgress={inProgress} closed={closed} />

      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker -Dashboard',
  description: 'View a Summary of Project Issues'
}
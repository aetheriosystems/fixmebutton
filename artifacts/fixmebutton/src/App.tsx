import { Switch, Route, Router as WouterRouter, useParams } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header, Footer } from "@/components/layout/Header";
import HomePage from "@/pages/HomePage";
import GuidesPage from "@/pages/GuidesPage";
import CategoryPage from "@/pages/CategoryPage";
import GuidePage from "@/pages/GuidePage";
import AboutPage from "@/pages/AboutPage";
import PricingPage from "@/pages/PricingPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function CategoryRoute() {
  const params = useParams<{ category: string }>();
  return <CategoryPage category={params.category} />;
}

function GuideRoute() {
  const params = useParams<{ category: string; slug: string }>();
  return <GuidePage category={params.category} slug={params.slug} />;
}

function Router() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/guides" component={GuidesPage} />
          <Route path="/guides/:category/:slug" component={GuideRoute} />
          <Route path="/guides/:category" component={CategoryRoute} />
          <Route path="/about" component={AboutPage} />
          <Route path="/pricing" component={PricingPage} />
          <Route path="/auth/signin" component={SignInPage} />
          <Route path="/auth/signup" component={SignUpPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;

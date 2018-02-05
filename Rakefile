$:.unshift "./lib"
$:.unshift "./plugins"

require "gress"
require "rake/clean"
require "rspec/core/rake_task"

RSpec::Core::RakeTask.new("spec")
CLEAN.include("public/*")

config = Gress::Config.parse("config.json")

task :build do
  Rake::Task["clean"].invoke
  cp_r "static/.", "public"
  Gress::Generator.generate("config.json")

  if config.mode =~ /^json/
    system "yarn run build"
  end
end

task :watch do
  pid = nil

  loop {
    if !pid.nil?
      Rake::Task["server"].execute
    else
      pid = fork {
        sh "guard --no-interactions"
      }
    end
  }
end

task :preview do
  Rake::Task["build"].execute
  Rake::Task["server"].execute
end

task :server do
  rackupPid = Process.spawn("ruby -run -e httpd public -p 4000")
  trap("INT") {
    Process.kill(9, rackupPid) rescue Errno::ESRCH
    exit 0
  }
  Process.wait(rackupPid)
end

task :github_setup do
  repository = Gress::Repository.new(config.repository)
  cd "public" do
    system "git init"
    system "git remote add origin #{repository.origin}"
  end
end

task :github_deploy do
  repository = Gress::Repository.new(config.repository)
  cd "public" do
    system "git add -A"
    system "git commit -m \"Site updated at #{Time.now.utc}\""
    system "git push origin #{repository.branch}"
  end
end

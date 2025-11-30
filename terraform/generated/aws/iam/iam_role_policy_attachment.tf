resource "aws_iam_role_policy_attachment" "tfer--AWSServiceRoleForAutoScaling_AutoScalingServiceRolePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AutoScalingServiceRolePolicy"
  role       = "AWSServiceRoleForAutoScaling"
}

resource "aws_iam_role_policy_attachment" "tfer--AWSServiceRoleForRDS_AmazonRDSServiceRolePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AmazonRDSServiceRolePolicy"
  role       = "AWSServiceRoleForRDS"
}

resource "aws_iam_role_policy_attachment" "tfer--AWSServiceRoleForResourceExplorer_AWSResourceExplorerServiceRolePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AWSResourceExplorerServiceRolePolicy"
  role       = "AWSServiceRoleForResourceExplorer"
}

resource "aws_iam_role_policy_attachment" "tfer--AWSServiceRoleForSupport_AWSSupportServiceRolePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AWSSupportServiceRolePolicy"
  role       = "AWSServiceRoleForSupport"
}

resource "aws_iam_role_policy_attachment" "tfer--AWSServiceRoleForTrustedAdvisor_AWSTrustedAdvisorServiceRolePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AWSTrustedAdvisorServiceRolePolicy"
  role       = "AWSServiceRoleForTrustedAdvisor"
}

resource "aws_iam_role_policy_attachment" "tfer--EC2-InstanceRole_AmazonEC2ReadOnlyAccess" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess"
  role       = "EC2-InstanceRole"
}

resource "aws_iam_role_policy_attachment" "tfer--EC2-InstanceRole_AmazonS3ReadOnlyAccess" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
  role       = "EC2-InstanceRole"
}

resource "aws_iam_role_policy_attachment" "tfer--EC2-InstanceRole_AmazonSSMManagedInstanceCore" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  role       = "EC2-InstanceRole"
}

resource "aws_iam_role_policy_attachment" "tfer--EC2-InstanceRole_CloudWatchAgentServerPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
  role       = "EC2-InstanceRole"
}

resource "aws_iam_role_policy_attachment" "tfer--aws-elasticbeanstalk-service-role_AWSElasticBeanstalkEnhancedHealth" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth"
  role       = "aws-elasticbeanstalk-service-role"
}

resource "aws_iam_role_policy_attachment" "tfer--aws-elasticbeanstalk-service-role_AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy"
  role       = "aws-elasticbeanstalk-service-role"
}

resource "aws_iam_role_policy_attachment" "tfer--ec2forapp_AWSElasticBeanstalkMulticontainerDocker" {
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker"
  role       = "ec2forapp"
}

resource "aws_iam_role_policy_attachment" "tfer--ec2forapp_AWSElasticBeanstalkRoleSNS" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkRoleSNS"
  role       = "ec2forapp"
}

resource "aws_iam_role_policy_attachment" "tfer--ec2forapp_AWSElasticBeanstalkRoleWorkerTier" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkRoleWorkerTier"
  role       = "ec2forapp"
}

resource "aws_iam_role_policy_attachment" "tfer--ec2forapp_AWSElasticBeanstalkWebTier" {
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
  role       = "ec2forapp"
}

resource "aws_iam_role_policy_attachment" "tfer--ec2forapp_AWSElasticBeanstalkWorkerTier" {
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier"
  role       = "ec2forapp"
}

resource "aws_iam_role_policy_attachment" "tfer--ec2forapp_AdministratorAccess" {
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
  role       = "ec2forapp"
}

resource "aws_iam_role_policy_attachment" "tfer--ec2forapp_AdministratorAccess-AWSElasticBeanstalk" {
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess-AWSElasticBeanstalk"
  role       = "ec2forapp"
}

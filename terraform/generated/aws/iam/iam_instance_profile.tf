resource "aws_iam_instance_profile" "tfer--EC2-InstanceRole" {
  name = "EC2-InstanceRole"
  path = "/"
  role = "EC2-InstanceRole"
}

resource "aws_iam_instance_profile" "tfer--ec2forapp" {
  name = "ec2forapp"
  path = "/"
  role = "ec2forapp"
}
